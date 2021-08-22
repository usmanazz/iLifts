import { makeObservable, observable } from "mobx";

export class CounterStore {
  @observable count = 0;

  constructor() {
    makeObservable(this);
  }
}
