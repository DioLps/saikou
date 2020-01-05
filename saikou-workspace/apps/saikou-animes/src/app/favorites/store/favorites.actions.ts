import { FavoriteAnime } from './favorites.model';

export class GetAllFavoriteAnimes {
  static readonly type =
    '[GetAllFavoritesAnimes] Getting All favorite animes on storage';
  constructor(public payload?: any) {}
}

export class SetFavoriteAnime {
  static readonly type = '[SetFavoriteAnime] Setting favorite anime on storage';
  constructor(public payload: FavoriteAnime) {}
}


export class IsThisAFavoriteAnime {
  static readonly type = '[IsThisAFavoriteAnime] Verify if this hash exist on storage';
  constructor(public payload: FavoriteAnime) {}
}
