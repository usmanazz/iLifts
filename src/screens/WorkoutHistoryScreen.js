import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootStoreContext } from "../stores/RootStore";

export const WorkoutHistoryScreen = observer(({ navigation }) => {
  const rootStore = useContext(RootStoreContext);

  return (
    <View style={styles.container}>
      <Text>Workout History Screen</Text>
      <Button
        title="create workout"
        onPress={() => {
          rootStore.workoutStore.currentExercises.push(
            {
              exercise: "Squat",
              numSets: 4,
              reps: 5,
              sets: [
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
                { reps: "X", state: "inactive" },
              ],
              weight: 260,
            },
            {
              exercise: "Bench Press",
              numSets: 5,
              reps: 5,
              sets: [
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
                { reps: "5", state: "inactive" },
              ],
              weight: 200,
            },
            {
              exercise: "Deadlift",
              numSets: 1,
              reps: 5,
              sets: [
                { reps: "5", state: "inactive" },
                { reps: "X", state: "inactive" },
                { reps: "X", state: "inactive" },
                { reps: "X", state: "inactive" },
                { reps: "X", state: "inactive" },
              ],
              weight: 315,
            }
          );
          navigation.navigate("CurrentWorkout");
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
