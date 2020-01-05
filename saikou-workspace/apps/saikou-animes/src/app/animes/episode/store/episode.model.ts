export interface EpisodeModel {
  episode: EpisodeData;
}

export interface EpisodeData {
  main: string;
  mainLabel: string;
  pageControl: Array<PageControl>;
}
export interface PageControl {
  url: string;
  type: string;
}
