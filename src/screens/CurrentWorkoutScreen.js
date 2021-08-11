import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SaveButton } from "../components/SaveButton";
import { WorkoutCard } from "../components/WorkoutCard";
import { WorkoutTimer } from "../components/WorkoutTimer";
import { RootStoreContext } from "../stores/RootStore";

export const CurrentWorkoutScreen = observer(({ route, navigation }) => {
  const rootStore = useContext(RootStoreContext);
  const { date } = route.params;
  const isCurrentWorkout = date === "";

  useEffect(() => {
    return () => rootStore.workoutTimerStore.endTimer();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {date !== "" ? (
          <Button
            title="edit"
            onPress={() =>
              navigation.navigate("EditWorkout", {
                date: date,
              })
            }
          />
        ) : null}

        {(isCurrentWorkout
          ? rootStore.workoutStore.currentExercises
          : rootStore.workoutStore.history.find(
              (workout) => Object.keys(workout)[0] === date
            )[date]
        ).map((e) => {
          return (
            <WorkoutCard
              onSetPress={(setIndex) => {
                rootStore.workoutTimerStore.startTimer();
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
                  rootStore.workoutTimerStore.endTimer();
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
      </ScrollView>

      <SaveButton
        handleSave={() => {
          // dont need to clear exercises if doing day in history
          if (isCurrentWorkout) {
            // using push to allow saving multiple workouts of the same day
            const savedWorkout = {};
            savedWorkout[dayjs().format("YYYY-MM-DDTHH:mm:ss")] =
              rootStore.workoutStore.currentExercises;
            rootStore.workoutStore.history.push(savedWorkout);

            // rootStore.workoutStore.history[dayjs().format("YYYY-DD-MM")] =
            //   rootStore.workoutStore.currentExercises;
            rootStore.workoutStore.currentExercises = [];
          }
          navigation.navigate("WorkoutHistory");
        }}
      />

      {rootStore.workoutTimerStore.isRunning ? (
        <WorkoutTimer
          currentTime={rootStore.workoutTimerStore.display}
          percentProgressLine={rootStore.workoutTimerStore.percentProgressLine}
          onDeletePress={() => rootStore.workoutTimerStore.endTimer()}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingBottom: 100,
  },

  scrollContainer: {
    width: "100%",
    paddingTop: 20,
  },
});
