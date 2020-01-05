export interface AnimesData {
  animes: Array<AnimeData>;
}

export interface AnimeData {
  hash: number;
  title: string;
  genre: string;
  videos: number;
  cover: string;
  type: string;
  slug: string;
  status?: string;
  synopsis?: string;
  views?: string;
}

export interface PagerData {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
