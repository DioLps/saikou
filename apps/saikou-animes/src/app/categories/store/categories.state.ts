import { State, Selector } from '@ngxs/store';
import { CategoriesService } from './categories.service';
import { CategoriesData, CategoryData } from './categories.model';

export class CategoriesStateModel implements CategoriesData {
  categories: CategoryData[];
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: []
  }
})
export class CategoriesState {
  constructor(private aServ: CategoriesService) {}
  @Selector()
  public static categories(state: CategoriesStateModel) {
    return state.categories;
  }
}
