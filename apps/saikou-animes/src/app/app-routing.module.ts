import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimesComponent } from './animes/animes.component';
import { DetailsComponent } from './animes/details/details.component';
import { EpisodeComponent } from './animes/episode/episode.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'animes', pathMatch: 'full' },
  { path: 'animes', component: AnimesComponent },
  { path: 'animes/details/:slug', component: DetailsComponent },
  { path: 'animes/episode/:slug', component: EpisodeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '**', redirectTo: 'animes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
