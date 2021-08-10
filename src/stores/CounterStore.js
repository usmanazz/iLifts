import { makeObservable, observable } from "mobx";
import { createContext } from "react";

export class CounterStore {
  @observable count = 0;

  constructor() {
    makeObservable(this);
  }
}
