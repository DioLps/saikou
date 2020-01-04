export class FavoriteAnime {
  hash: string;
  lastEpisode?: LastEpisode;
}

export class LastEpisode {
  hash: string;
  stoppedAt: string;
}
