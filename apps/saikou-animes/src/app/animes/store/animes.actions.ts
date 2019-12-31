export class GetAnimes {
  static readonly type = '[Animes] Get';
  constructor(public payload?: any) {}
}

export class GetDetailAnime {
  static readonly type = '[GetDetailAnime] Get details';
  constructor(public payload?: any) {}
}
