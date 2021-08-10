import { createContext } from "react";
import { WorkoutStore } from "./WorkoutStore";
import { WorkoutTimerStore } from "./WorkoutTimerStore";
import AsyncStorage from "@react-native-community/async-storage";
import { create } from "mobx-persist";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true, // if use AsyncStorage, here shoud be true
});

export class RootStore {
  workoutStore = new WorkoutStore(this);
  workoutTimerStore = new WorkoutTimerStore(this);

  constructor() {
    hydrate("workoutTimer", this.workoutTimerStore);
    hydrate("workout", this.workoutTimerStore);
  }
}

export const RootStoreContext = createContext(new RootStore());
