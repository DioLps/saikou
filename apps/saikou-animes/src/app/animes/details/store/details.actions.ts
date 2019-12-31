import { DetailsPayload } from './details.model';

export class GetEpisodesDetails {
  static readonly type = '[GetEpisodesDetails] Get episode Details';
  constructor(public payload: DetailsPayload) {}
}
