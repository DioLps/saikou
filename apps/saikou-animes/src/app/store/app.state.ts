import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Title } from '@angular/platform-browser';
import { SetTitle } from './app.actions';

export class TitleStateModel {
  title: string;
}

@State<TitleStateModel>({
  name: 'title',
  defaults: {
    title: 'Saikou Animes'
  }
})
export class TitleState {
  constructor(private title: Title) {}
  @Selector()
  public static Title(state: TitleStateModel) {
    return state.title;
  }

  @Action(SetTitle)
  setTitle(
    { patchState }: StateContext<TitleStateModel>,
    { payload }: SetTitle
  ) {
    this.title.setTitle(payload);
    patchState({ title: payload });
  }
}
