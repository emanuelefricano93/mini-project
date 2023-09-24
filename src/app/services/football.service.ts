import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StandingClub, Standings, StandingsResponse } from './types/standingsResponse';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  apiKey = "3b74271185aa8d2591ed69977ed79600";

  private http = inject(HttpClient);

  getStandings(country: string): Observable<Standings> {
    const leagueName = this.getLeagueFromCountry(country);
    return this.http.get<StandingsResponse>(leagueName).pipe(
      map(res => this.toStandings(res)));
  }

  private getLeagueFromCountry(country: string) {
    let league = 'premier';
    if (country === 'england') {
      league = 'premier';
    }
    return league;
  }

  private toStandings(res: StandingsResponse): Standings {
    //todo transform the response

    const clubs: StandingClub[] = [
      {name: 'Manchester'}
    ];
    return {clubs};
  }

}
