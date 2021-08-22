import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { RootStoreContext } from "../stores/RootStore";

export const EditExerciseScreen = observer(({ route, navigation }) => {
  const rootStore = useContext(RootStoreContext);
  const { date, exercise } = route.params;
  const exerciseToEdit =
    date === ""
      ? rootStore.workoutStore.currentExercises.find(
          (e) => e.exercise === exercise
        )
      : rootStore.workoutStore.history
          .find((workout) => Object.keys(workout)[0] === date)
          [date].find((e) => e.exercise === exercise);
  const [weight, onChangeWeight] = useState(`${exerciseToEdit.weight}`);
  const [numberOfSets, onChangeNumberOfSets] = useState(
    `${exerciseToEdit.numSets}`
  );

  // edit weight for each exercise
  useEffect(() => {
    if (date === "") {
      for (const i in rootStore.workoutStore.currentExercises) {
        if (rootStore.workoutStore.currentExercises[i].exercise === exercise) {
          rootStore.workoutStore.currentExercises[i].weight = weight;
        }
      }

      if (exercise === "Squat")
        rootStore.workoutStore.currentSquat = parseInt(weight) + 5;
      else if (exercise === "Bench Press")
        rootStore.workoutStore.currentBenchPress = parseInt(weight) + 5;
      else if (exercise === "Deadlift")
        rootStore.workoutStore.currentDeadlift = parseInt(weight) + 5;
      else if (exercise === "Overhead Press")
        rootStore.workoutStore.currentOverheadPress = parseInt(weight) + 5;
      else if (exercise === "Barbell Row")
        rootStore.workoutStore.currentBarbellRow = parseInt(weight) + 5;
    } else {
      rootStore.workoutStore.history
        .find((workout) => Object.keys(workout)[0] === date)
        [date].map((e) => {
          if (e.exercise === exercise) {
            e.weight = parseInt(weight);
          }
        });
    }
  }, [weight]);

  // edit number of sets for an exercise
  const firstUpdate = useRef(true); // prevent useEffect from running on intial mount
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      if (numberOfSets > 0 && numberOfSets <= 5) {
        if (date === "") {
          for (const i in rootStore.workoutStore.currentExercises) {
            if (
              rootStore.workoutStore.currentExercises[i].exercise === exercise
            ) {
              rootStore.workoutStore.currentExercises[i].numSets =
                parseInt(numberOfSets);

              // display correct number of sets (max: 5, min: 1)
              rootStore.workoutStore.currentExercises[i].sets = [];
              for (let j = 0; j < numberOfSets; j++) {
                rootStore.workoutStore.currentExercises[i].sets.push({
                  reps: "5",
                  state: "inactive",
                });
              }
              for (let k = 0; k < 5 - numberOfSets; k++) {
                rootStore.workoutStore.currentExercises[i].sets.push({
                  reps: "X",
                  state: "inactive",
                });
              }
            }
          }
        } else {
          rootStore.workoutStore.history
            .find((workout) => Object.keys(workout)[0] === date)
            [date].map((e) => {
              if (e.exercise === exercise) {
                e.numSets = parseInt(numberOfSets);

                e.sets = [];
                for (let j = 0; j < numberOfSets; j++) {
                  e.sets.push({
                    reps: "5",
                    state: "inactive",
                  });
                }
                for (let k = 0; k < 5 - numberOfSets; k++) {
                  e.sets.push({
                    reps: "X",
                    state: "inactive",
                  });
                }
              }
            });
        }
      }
    }
  }, [numberOfSets]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.exerciseWeight, styles.divider]}>
          <Text style={[styles.whiteText, styles.lineHeight]}>
            Exercise Weight
          </Text>

          <View style={styles.inputWeightContainer}>
            <TextInput
              style={[styles.whiteText, styles.lineHeight]}
              selectionColor={"#fff"}
              onChangeText={onChangeWeight}
              value={weight}
              keyboardType="numeric"
            />
            <Text style={[styles.whiteText, styles.lineHeight]}>lb</Text>
          </View>
        </View>

        <View style={styles.exerciseSets}>
          <Text style={[styles.whiteText, styles.lineHeight]}>
            Number of Sets
          </Text>
          <TextInput
            style={[styles.whiteText, styles.lineHeight]}
            selectionColor={"#fff"}
            onChangeText={onChangeNumberOfSets}
            value={numberOfSets}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (date === "") {
            for (const i in rootStore.workoutStore.currentExercises) {
              if (
                rootStore.workoutStore.currentExercises[i].exercise === exercise
              ) {
                rootStore.workoutTimerStore.endTimer();
                for (
                  let j = 0;
                  j < rootStore.workoutStore.currentExercises[i].numSets;
                  j++
                ) {
                  rootStore.workoutStore.currentExercises[i].sets[j] = {
                    reps: "5",
                    state: "inactive",
                  };
                }
              }
            }
          } else {
            rootStore.workoutStore.history
              .find((workout) => Object.keys(workout)[0] === date)
              [date].map((e) => {
                if (e.exercise === exercise) {
                  rootStore.workoutTimerStore.endTimer();
                  for (let i = 0; i < e.numSets; i++) {
                    e.sets[i] = { reps: "5", state: "inactive" };
                  }
                }
              });
          }
        }}
      >
        <Text style={styles.resetExerciseText}>Reset Exercise</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingBottom: 100,
    paddingTop: 35,
  },

  card: {
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    width: "85%",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  divider: {
    borderBottomColor: "#3a3a3c",
    borderBottomWidth: 1,
  },

  exerciseSets: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  exerciseWeight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputWeightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  lineHeight: {
    paddingVertical: 10,
  },

  resetExerciseText: {
    color: "red",
    fontSize: 18,
  },

  whiteText: {
    color: "#fff",
    fontSize: 18,
  },
});
