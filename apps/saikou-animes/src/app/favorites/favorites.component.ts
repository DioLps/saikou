import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllFavoriteAnimes } from './store/favorites.actions';
import { map, switchMap, tap, take, filter, skipUntil } from 'rxjs/operators';
import { GetAnimes, GetDetailAnime } from '../animes/store/animes.actions';
import { AnimeData } from '../animes/store/animes.model';
import { Navigate } from '@ngxs/router-plugin';
import { GetEpisodesDetails } from '../animes/details/store/details.actions';

@Component({
  selector: 'saikou-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favorites: Array<AnimeData> = [];
  public isLoading = true;

  constructor(private store: Store) {
    this.store.dispatch([new GetAnimes(), new GetAllFavoriteAnimes()]);
  }

  ngOnInit() {
    this.loadFavorites();
  }

  private loadFavorites() {
    this.favorites = [];
    this.store
      .select(state => state.animes)
      .pipe(
        filter(state => state.animes.length > 0),
        map(state => state.animes),
        switchMap((animes: any) =>
          this.store
            .select(state => state.favorites)
            .pipe(
              map(state => state.favorites),
              tap(favorites => {
                this.favorites = favorites.map(favorite => {
                  return animes.find(
                    anime => anime.hash === parseInt(favorite.hash)
                  );
                });
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe();
  }

  public goToDetail(anime: AnimeData) {
    this.store.dispatch([
      new GetDetailAnime(anime),
      new Navigate([`/animes/details/${anime.hash}`]),
      new GetEpisodesDetails({ slug: anime.slug, page: 1 })
    ]);
  }
}
