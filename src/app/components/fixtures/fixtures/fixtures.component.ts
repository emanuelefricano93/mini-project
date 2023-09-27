import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import FootballService from 'src/app/services/football.service';
import { Fixture } from 'src/app/services/types/fixtureResponse';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit, OnDestroy {
  @Input() teamId = 0;

  private footballService = inject(FootballService);
  fixtures: Fixture[] = [];
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.footballService.getFixtures(this.teamId).subscribe(res => this.fixtures = res);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
