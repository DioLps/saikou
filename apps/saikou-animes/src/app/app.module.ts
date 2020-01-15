import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AnimesComponent } from './animes/animes.component';
import { DetailsComponent } from './animes/details/details.component';
import { EpisodeComponent } from './animes/episode/episode.component';

import { AnimeService } from './animes/store/animes.service';
import { AnimesState } from './animes/store/animes.state';
import { environment } from '../environments/environment';
import { DetailsState } from './animes/details/store/details.state';
import { FavoritesComponent } from './favorites/favorites.component';
import { EpisodeState } from './animes/episode/store/episode.state';
import { FavoritesState } from './favorites/store/favorites.state';
import { TitleState } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    AnimesComponent,
    DetailsComponent,
    EpisodeComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxsModule.forRoot(
      [AnimesState, DetailsState, EpisodeState, FavoritesState, TitleState],
      {
        developmentMode: !environment.production
      }
    ),
    NgxsRouterPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  providers: [AnimeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
