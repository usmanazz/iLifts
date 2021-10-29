import { computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";

const workoutDay = [0, 1];

// Workout History Data Type
//
// Array[
//   Workouts:Object{
//     WorkoutDate: Exercises:Array[
//       Exercise:Object{}
//     ]
//   }
// ]

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
