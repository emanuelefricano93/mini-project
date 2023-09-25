import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Standing, StandingsResponse } from './types/standingsResponse';
import { CountryLeague } from './types/countryLeague';
import { Fixture, FixtureResponse } from './types/fixtureResponse';
import { LocalStorageService } from './local-storage.service';
import { CacheType } from './types/cacheType';

@Injectable({
  providedIn: 'root'
})
export default class FootballService{

  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private apiKey = "3b74271185aa8d2591ed69977ed79600";
  private hostName = "https://v3.football.api-sports.io";
  private standingsCache: CacheType<Standing> = {};
  private fixturesCache: CacheType<Fixture> = {};
  private countryLeagueList: CountryLeague[] = [
    {id: 39, key: 'ENGLAND', name: 'Premier League'},
    {id: 140, key: 'SPAIN', name: 'La Liga'},
    {id: 61, key: 'FRANCE', name: 'Ligue 1'},
    {id: 78, key: 'GERMANY', name: 'Bundesliga'},
    {id: 135, key: 'ITALY', name: 'Serie A'}
  ];

  constructor() {
    this.standingsCache = this.localStorageService.getItem<CacheType<Standing>>('STANDINGS') || {};
    this.fixturesCache = this.localStorageService.getItem<CacheType<Fixture>>('FIXTURES') || {};
  }

  getStandings(countryKey: Uppercase<string>): Observable<Standing[]> {
    const league = this.getCountryLeague(countryKey);
    const season = this.getCurrentSeason();
    const cacheKey = `${league}_${season}`;
    const cachedRes = this.standingsCache[cacheKey];
    if (cachedRes && !this.isCacheTooOld(cachedRes.insertTime)) {
      return of(cachedRes.values);
    } else {
      let params = new HttpParams();
      params = params.append('league', this.getCountryLeague(countryKey));
      params = params.append('season', this.getCurrentSeason());
      return this.http.get<StandingsResponse>(`${this.hostName}/standings`, {headers: this.getHeaders(), params})
        .pipe(map((res:StandingsResponse) => this.toStandings(res)),
          tap((standings: Standing[]) => this.updateStandingCache(cacheKey,standings, new Date())));
    }

  }

  getFixtures(teamId: number): Observable<Fixture[]> {
    const season = this.getCurrentSeason();
    const cacheKey = `${teamId}_${season}`;
    const cachedRes = this.fixturesCache[cacheKey];
    if (cachedRes && !this.isCacheTooOld(cachedRes.insertTime)) {
      return of(cachedRes.values);
    } else {
      let params = new HttpParams();
      params = params.append('team', teamId);
      params = params.append('last', 10);
      params = params.append('season', this.getCurrentSeason());
      return this.http.get<FixtureResponse>(`${this.hostName}/fixtures`, {headers: this.getHeaders(), params})
        .pipe(map((res:FixtureResponse) => this.toFixtures(res)),
          tap((fixtures: Fixture[]) => this.updateFixtureCache(cacheKey, fixtures, new Date())));
    }
  }

  private updateStandingCache(cacheKey: string, standings: Standing[], insertTime: Date) {
      this.standingsCache[cacheKey] = {values: standings, insertTime};
      this.localStorageService.setItem<CacheType<Standing>>('STANDINGS', this.standingsCache);
    }

  private updateFixtureCache(cacheKey: string, fixtures: Fixture[], insertTime: Date) {
    this.fixturesCache[cacheKey] = {values: fixtures, insertTime};
    this.localStorageService.setItem<CacheType<Fixture>>('FIXTURES', this.fixturesCache);
  }

  private getCountryLeague(countryKey: Uppercase<string>): number {
    return (this.countryLeagueList.find((c: CountryLeague) => c.key === countryKey) || this.countryLeagueList[0]).id;
  }

  private getCurrentSeason(): number {
    return new Date().getFullYear();
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('x-rapidapi-key', this.apiKey);
    headers = headers.append('x-rapidapi-host', 'v3.football.api-sports.io');
    return headers;
  }

  private toStandings(res: StandingsResponse): Standing[] {
    return res.response[0].league.standings[0];
  }

  private toFixtures(res: FixtureResponse): Fixture[] {
    return res.response;
  }

  private isCacheTooOld(insertTime: Date | string) {
    //cache too old after 30 minutes
    let insertCacheTime: Date;
    if (typeof insertTime === 'string') {
      insertCacheTime = new Date(insertTime);
    } else {
      insertCacheTime = insertTime;
    }
    return (new Date().getTime() - insertCacheTime.getTime()) > 30 * 60 *1000;
  }

}
