import { State, Selector, Action, StateContext } from '@ngxs/store';
import { FavoriteAnime } from './favorites.model';
import {
  GetAllFavoriteAnimes,
  SetFavoriteAnime,
  IsThisAFavoriteAnime
} from './favorites.actions';
import { FavoritesService } from './favorites.service';

export class FavoritesStateModel {
  favorites: Array<FavoriteAnime>;
  isFavorite?: boolean;
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favorites: [],
    isFavorite: false
  }
})
export class FavoritesState {
  constructor(private favoritesService: FavoritesService) {}
  @Selector()
  public static favorites(state: FavoritesStateModel) {
    return state.favorites;
  }

  @Action(GetAllFavoriteAnimes)
  getAllFavorites({ patchState }: StateContext<FavoritesStateModel>) {
    const favorites = this.favoritesService.getAll();
    if (favorites) {
      patchState({ favorites });
    }
  }

  @Action(SetFavoriteAnime)
  setFavorite(
    { dispatch }: StateContext<FavoritesStateModel>,
    { payload }: SetFavoriteAnime
  ) {
    this.favoritesService.setFavorite(payload);
    dispatch(new GetAllFavoriteAnimes());
  }

  @Action(IsThisAFavoriteAnime)
  verifyIfExisteOnStorage(
    { patchState, dispatch, getState }: StateContext<FavoritesStateModel>,
    { payload }: IsThisAFavoriteAnime
  ) {
    dispatch(new GetAllFavoriteAnimes());
    const isFavorite = getState().favorites.some(
      fav => fav.hash === payload.hash
    );
    patchState({ isFavorite });
  }
}
