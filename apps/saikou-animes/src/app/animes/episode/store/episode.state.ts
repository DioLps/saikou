import { State, Selector, Action, StateContext } from '@ngxs/store';

import { EpisodeModel, EpisodeData } from './episode.model';
import { EpisodeService } from './episode.service';
import { GetEpisode } from './episode.actions';

export class EpisodeStateModel implements EpisodeModel {
  episode: EpisodeData;
}

@State<EpisodeStateModel>({
  name: 'episode',
  defaults: {
    episode: null
  }
})
export class EpisodeState {
  constructor(private episodeService: EpisodeService) {}
  @Selector()
  public static animes(state: EpisodeStateModel) {
    return state.episode;
  }

  @Action(GetEpisode)
  getEpisodeAction(
    { patchState }: StateContext<EpisodeStateModel>,
    { payload }: GetEpisode
  ) {
    this.episodeService.getAnimeEpisode(payload).subscribe(episode => {
      patchState({ episode } as EpisodeModel);
    });
  }
}
