import { createContext } from "react";
import { WorkoutStore } from "./WorkoutStore";

export class RootStore {
  workoutStore = new WorkoutStore(this);
}

export const RootStoreContext = createContext(new RootStore());
