import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { WorkoutCard } from "../components/WorkoutCard";
import { RootStoreContext } from "../stores/RootStore";

export const CurrentWorkoutScreen = observer(({ navigation }) => {
  const rootStore = useContext(RootStoreContext);

  return (
    <View style={styles.container}>
      <Text>Current Workout Screen</Text>
      <Button
        title="go to workout history"
        onPress={() => navigation.navigate("WorkoutHistory")}
      />

      {rootStore.workoutStore.currentExercises.map((e) => {
        return (
          <WorkoutCard
            onSetPress={(setIndex) => {
              const set = e.sets[setIndex];

              let newValue;

              // reps on current set is === reps so need to see if circle is
              // displaying active or inactive number and increment accordingly
              if (set.reps === `${e.reps}`) {
                if (set.state === "inactive") {
                  newValue = { ...set, state: "active" };
                } else {
                  newValue = {
                    reps: `${parseInt(set.reps) - 1}`,
                    state: "active",
                  };
                }
              } else if (set.reps === "0") {
                newValue = { reps: `${e.reps}`, state: "inactive" };
              } else {
                newValue = {
                  reps: `${parseInt(set.reps) - 1}`,
                  state: "active",
                };
              }
              e.sets[setIndex] = newValue;
            }}
            key={e.exercise}
            exercise={e.exercise}
            sets={e.sets}
            repsAndWeight={`${e.numSets}x${e.reps} ${e.weight}`}
          />
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
});
