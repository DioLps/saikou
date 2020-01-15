export class SetTitle {
  static readonly type = '[SetTitle] Setting Title';
  constructor(public payload: string) {}
}
