import { AnimesData, AnimeData } from './animes.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetAnimes, GetDetailAnime } from './animes.actions';
import { AnimeService } from './animes.service';
import { take } from 'rxjs/operators';

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
  constructor(private aServ: AnimeService) {}
  @Selector()
  public static animes(state: AnimesStateModel) {
    return state.animes;
  }

  @Action(GetAnimes)
  getAnimesAction({ patchState }: StateContext<AnimesStateModel>) {
    this.aServ
      .getAnimes()
      .pipe(take(1))
      .subscribe((animes: AnimesData) => {
        patchState(animes);
      });
  }

  @Action(GetDetailAnime)
  getDetailsAnimeAction(
    { getState, patchState }: StateContext<AnimesStateModel>,
    { payload }: GetDetailAnime
  ) {
    const state = getState();
    this.aServ
      .getDetailsAnime(payload.hash)
      .pipe(take(1))
      .subscribe((animes: AnimesData) => {
        const newState = state.animes.map((anime: AnimeData) => {
          if (anime.hash === payload.hash) {
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
      });
  }
}
