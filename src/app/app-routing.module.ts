import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './components/standings/standings/standings.component';
import { FixturesComponent } from './components/fixtures/fixtures/fixtures.component';

const routes: Routes = [
  {path: 'home', component: StandingsComponent},
  {path: 'results/:teamId', component: FixturesComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: StandingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
