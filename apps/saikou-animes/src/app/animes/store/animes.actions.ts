import { AnimeData, AnimesData } from './animes.model';

export class GetAnimes {
  static readonly type = '[Animes] Get';
  constructor(public payload?: any) {}
}


export class SetAnimes {
  static readonly type = '[SetAnime] Set';
  constructor(public payload: AnimesData) {}
}


export class GetDetailAnime {
  static readonly type = '[GetDetailAnime] Get details';
  constructor(public payload: AnimeData) {}
}
