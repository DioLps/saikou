import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimesComponent } from './animes/animes.component';
import { DetailsComponent } from './animes/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: 'animes', pathMatch: 'full' },
  { path: 'animes', component: AnimesComponent },
  { path: 'animes/details/:slug', component: DetailsComponent },
  { path: '**', redirectTo: 'animes', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
