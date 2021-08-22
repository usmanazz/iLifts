import { createContext } from "react";
import { WorkoutStore } from "./WorkoutStore";
import { WorkoutTimerStore } from "./WorkoutTimerStore";
import { create } from "mobx-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true, // if use AsyncStorage, here shoud be true
});

export class RootStore {
  workoutStore = new WorkoutStore(this);
  workoutTimerStore = new WorkoutTimerStore(this);

  constructor() {
    hydrate("workoutTimer", this.workoutTimerStore).then(() => {
      if (this.workoutTimerStore.isRunning) this.workoutTimerStore.measure();
    });
    hydrate("workout", this.workoutStore);
  }
}

export const RootStoreContext = createContext(new RootStore());
