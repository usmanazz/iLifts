import { computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";

const workoutDay = [0, 1];

// Workout History example
// means, on a given day, someone did an array of exercises

// {
//   '2019-02-18': [
//     {
//       exercise: 'squat',
//       value: 90
//     },
//     {
//       exercise: 'bench',
//       value: 135
//     },
//   ],
// }

export class WorkoutStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @persist @observable currentSquat = 45;
  @persist @observable currentBenchPress = 45;
  @persist @observable currentOverheadPress = 45;
  @persist @observable currentDeadlift = 65;
  @persist @observable currentBarbellRow = 65;

  @persist @observable lastWorkoutDay = workoutDay[0];

  @persist("list") @observable currentExercises = [];

  @computed get hasCurrentWorkout() {
    return this.currentExercises.length > 0;
  }

  @persist("list") @observable history = [];
}
