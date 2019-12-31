import { State, Selector, Action, StateContext } from '@ngxs/store';

import { EpisodeDetailsData } from './details.model';
import { DetailsService } from './details.service';
import { GetEpisodesDetails } from './details.actions';

export class DetailsStateModel {
  details: EpisodeDetailsData;
}

@State<DetailsStateModel>({
  name: 'details',
  defaults: {
    details: null
  }
})
export class DetailsState {
  constructor(private detailsService: DetailsService) {}
  @Selector()
  public static animes(state: DetailsStateModel) {
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
        console.log('details', details);
        // patchState(details);
      });
  }
}
