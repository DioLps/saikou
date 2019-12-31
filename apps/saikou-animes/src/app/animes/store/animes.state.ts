import { AnimesData, AnimeData } from './animes.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetAnimes, GetDetailAnime } from './animes.actions';
import { AnimesService } from './animes.service';

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
    { getState, patchState }: StateContext<AnimesStateModel>,
    { payload }: GetDetailAnime
  ) {
    const state = getState();
    this.aServ.getDetailsAnime(payload.hash).subscribe((animes: AnimesData) => {
      const newState = state.animes.map((anime: AnimeData) => {
        if (anime.hash === payload.hash) {
          anime = {
            ...anime,
            ...animes
          };
          console.log(anime);
        }
        return anime;
      });
      patchState({
        animes: newState
      });
    });
  }
}
