import dayjs from "dayjs";
import { action, computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";

const padZero = (num) => {
  if (num >= 10) return num;
  return `0${num}`;
};

export class WorkoutTimerStore {
  constructor() {
    makeObservable(this);
  }

  @persist @observable startTime = dayjs();
  @persist @observable isRunning = false;
  @persist @observable seconds = 0;

  @action measure() {
    if (!this.isRunning) return;

    this.seconds = dayjs().diff(this.startTime, "second");
    setTimeout(() => this.measure(), 1000);
  }

  @action startTimer() {
    this.isRunning = true;
    this.startTime = dayjs();
    this.measure();
  }

  @action endTimer() {
    this.isRunning = false;
    this.seconds = 0;
  }

  @computed get percentProgressLine() {
    return `${Math.min(100, (this.seconds / 180) * 100)}%`;
  }

  @computed get display() {
    const minutes = Math.floor(this.seconds / 60);
    const seconds = Math.floor(this.seconds % 60);

    return `${padZero(minutes)}:${padZero(seconds)}`;
  }
}
