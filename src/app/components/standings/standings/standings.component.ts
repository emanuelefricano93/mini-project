import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import FootballService from 'src/app/services/football.service';
import { Standing, Team } from 'src/app/services/types/standingsResponse';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnDestroy {

  private footballService = inject(FootballService);
  standings: Standing[] = [];
  subscriptions: Subscription[] = [];


  onCountrySelected(countryKey: Uppercase<string>) {
    this.subscriptions.push(this.footballService.getStandings(countryKey).subscribe(res => this.standings = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
