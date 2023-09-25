import { Component, Input } from '@angular/core';
import { Fixture } from 'src/app/services/types/fixtureResponse';

@Component({
  selector: 'app-fixture-detail',
  templateUrl: './fixture-detail.component.html',
  styleUrls: ['./fixture-detail.component.scss']
})
export class FixtureDetailComponent {

  @Input() fixture: Fixture | undefined;
}
