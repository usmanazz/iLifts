import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
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

  useLayoutEffect(() => {
    if (!isCurrentWorkout) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            title="Delete"
            onPress={() => {
              try {
                rootStore.workoutStore.history =
                  rootStore.workoutStore.history.filter(
                    (workout) => Object.keys(workout)[0] !== date
                  );
                navigation.navigate("WorkoutHistory");
              } catch (error) {
                console.error(error);
              }
            }}
            color="#30d158"
          />
        ),
      });
    }
  }, [navigation]);

  const handleSetChange = (setIndex, exercise) => {
    rootStore.workoutTimerStore.startTimer();
    const set = exercise.sets[setIndex];

    let newValue;

    // reps on current set is === reps so need to see if circle is
    // displaying active or inactive number and increment accordingly
    if (set.reps === `${exercise.reps}`) {
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
      newValue = { reps: `${exercise.reps}`, state: "inactive" };
    } else {
      newValue = {
        reps: `${parseInt(set.reps) - 1}`,
        state: "active",
      };
    }
    exercise.sets[setIndex] = newValue;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {(isCurrentWorkout
          ? rootStore.workoutStore.currentExercises
          : rootStore.workoutStore.history.find(
              (workout) => Object.keys(workout)[0] === date
            )[date]
        ).map((e) => {
          return (
            <WorkoutCard
              key={e.exercise}
              navigation={navigation}
              date={date}
              exercise={e.exercise}
              sets={e.sets}
              repsAndWeight={`${e.numSets}x${e.reps} ${e.weight}lb`}
              onSetPress={(setIndex) => handleSetChange(setIndex, e)}
            />
          );
        })}
      </ScrollView>

      <SaveButton
        handleSave={() => {
          // dont need to clear exercises if a history workout
          if (isCurrentWorkout) {
            // use array push to allow saving multiple workouts of the same day
            const savedWorkout = {};
            savedWorkout[dayjs().format("YYYY-MM-DDTHH:mm:ss")] =
              rootStore.workoutStore.currentExercises;
            rootStore.workoutStore.history.push(savedWorkout);
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
