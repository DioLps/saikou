import { CategoriesData, CategoryData } from './categories.model';

export class GetCategories {
  static readonly type = '[Categories] Get';
  constructor(public payload?: any) {}
}

export class SetCategories {
  static readonly type = '[SetAnime] Set';
  constructor(public payload: CategoriesData) {}
}

export class GetDetailAnime {
  static readonly type = '[GetDetailAnime] Get details';
  constructor(public payload: CategoryData) {}
}
