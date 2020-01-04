import { State, Selector, Action, StateContext } from '@ngxs/store';

import { EpisodeDetailsData } from './details.model';
import { DetailsService } from './details.service';
import { GetEpisodesDetails } from './details.actions';

export class DetailsStateModel {
  details: EpisodeDetailsData;
  hash?: string;
}

@State<DetailsStateModel>({
  name: 'details',
  defaults: {
    details: null,
    hash: ''
  }
})
export class DetailsState {
  constructor(
    private detailsService: DetailsService
  ) {}
  @Selector()
  public static details(state: DetailsStateModel) {
    return state.details;
  }

  @Action(GetEpisodesDetails)
  getAnimesAction(
    { patchState }: StateContext<DetailsStateModel>,
    { payload }: GetEpisodesDetails
  ) {
    this.detailsService
      .getAnimeEpisodes(payload)
      .subscribe((details: EpisodeDetailsData) => {
        patchState({ details });
      });
  }
}
