import { AnimesData, AnimeData } from './animes.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetAnimes, GetDetailAnime } from './animes.actions';
import { AnimesService } from './animes.service';
import { Navigate } from '@ngxs/router-plugin';

export class AnimesStateModel implements AnimesData {
  animes: AnimeData[];
}

@State<AnimesStateModel>({
  name: 'animes',
  defaults: {
    animes: []
  }
})
export class AnimesState {
  constructor(private aServ: AnimesService) {}
  @Selector()
  public static animes(state: AnimesStateModel) {
    return state.animes;
  }

  @Action(GetAnimes)
  getAnimesAction({ patchState }: StateContext<AnimesStateModel>) {
    this.aServ.getAnimes().subscribe((animes: AnimesData) => {
      patchState(animes);
    });
  }

  @Action(GetDetailAnime)
  getDetailsAnimeAction(
    { getState, patchState, dispatch }: StateContext<AnimesStateModel>,
    { payload }: GetDetailAnime
  ) {
    const state = getState();
    this.aServ.getDetailsAnime(payload).subscribe((animes: AnimesData) => {
      const newState = state.animes.map((anime: AnimeData) => {
        if (anime.hash === payload) {
          anime = {
            ...anime,
            ...animes
          };
        }
        return anime;
      });
      patchState({
        animes: newState
      });

      dispatch(new Navigate([`/animes/details/${payload}`]));
    });
  }
}
