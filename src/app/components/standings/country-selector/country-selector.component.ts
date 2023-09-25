import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Country } from '../types/country';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit{

  @Output()
  countrySelected: EventEmitter<Uppercase<string>> = new EventEmitter<Uppercase<string>>();

  private localStorageService = inject(LocalStorageService);
  currentCountry = '';

  countryList: Country[] = [
    {
      id: 'englandSelect',
      name: 'England',
      value: 'ENGLAND'
    },
    {
      id: 'spainSelect',
      name: 'Spain',
      value: 'SPAIN'
    },
    {
      id: 'germanySelect',
      name: 'Germany',
      value: 'GERMANY'
    },
    {
      id: 'franceSelect',
      name: 'France',
      value: 'FRANCE'
    },
    {
      id: 'italySelect',
      name: 'Italy',
      value: 'ITALY'
    }];

    ngOnInit(): void {
      const lastValue = this.localStorageService.getSimpleItem('LAST_COUNTRY_SELECTED') as Uppercase<string>;
      if (lastValue && this.countryList.find(c => c.value === lastValue)) {
        this.onCountrySelected(lastValue);
      }
    }

    onCountrySelected(value: Uppercase<string>) {
      this.countrySelected.emit(value);
      this.currentCountry = value;
      this.localStorageService.setSimpleItem('LAST_COUNTRY_SELECTED', this.currentCountry);
    }
}
