export class EpisodeDetailsData {
  nextPage: boolean | number;
  prevPage: boolean | number;
  episodes: Array<EpisodesData>;
}

export class EpisodesData {
  title: string;
  slug: number;
  image: string;
  duration: number;
  views: string;
  date: string;
}

export class DetailsPayload {
  slug: string;
  page?: number;
}
