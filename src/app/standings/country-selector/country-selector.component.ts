import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent {

  @Output()
  countrySelected: EventEmitter<string> = new EventEmitter<string>();

  countryList = ['England', 'Spain', 'Germany', 'France', 'Italy'];

}
