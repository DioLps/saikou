import { Injectable } from '@angular/core';
import { FavoriteAnime } from './favorites.model';
import { Favorites } from './favorites.enum';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor() {}

  public getAll(): Array<FavoriteAnime> {
    try {
      return JSON.parse(localStorage.getItem(Favorites.KEY));
    } catch (error) {
      console.error('Error saving to localStorage', error);
      return [];
    }
  }

  public setFavorite(favorite: FavoriteAnime) {
    try {
      let favorites = this.getAll();
      if (favorites) {
        if (favorites.find(fav => fav.hash === favorite.hash)) {
          favorites = favorites.filter(fav => fav.hash !== favorite.hash);
        } else {
          favorites.push(favorite);
        }
      } else {
        favorites = [favorite];
      }
      localStorage.setItem(Favorites.KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }
}
