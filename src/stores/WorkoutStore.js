import { makeObservable, observable } from "mobx";

const workoutDay = [0, 1];

export class WorkoutStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable currentSquat = 0;
  @observable currentBenchPress = 0;
  @observable currentOverheadPress = 0;
  @observable currentDeadlift = 0;
  @observable currentBarbellRow = 0;

  @observable lastWorkoutDay = workoutDay[0];

  @observable currentExercises = [];

  @observable history = {};
}
