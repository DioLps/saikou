export interface CategoriesData {
  categories: Array<CategoryData>;
}

export interface CategoryData {
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
