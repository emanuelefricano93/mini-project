import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './components/standings/standings/standings.component';
import { CountrySelectorComponent } from './components/standings/country-selector/country-selector.component';
import { FixturesComponent } from './components/fixtures/fixtures/fixtures.component';
import { FixtureDetailComponent } from './components/fixtures/fixture-detail/fixture-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    CountrySelectorComponent,
    FixturesComponent,
    FixtureDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
