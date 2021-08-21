import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SaveButton } from "../components/SaveButton";
import { WorkoutCard } from "../components/WorkoutCard";
import { WorkoutTimer } from "../components/WorkoutTimer";
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
            e.weight = weight;
          }
        });
    }
  }, [weight]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.exerciseWeight}>
          <Text style={styles.whiteText}>Exercise Weight</Text>

          <View style={styles.inputWeightContainer}>
            <TextInput
              style={styles.whiteText}
              selectionColor={"#fff"}
              onChangeText={onChangeWeight}
              value={weight}
              keyboardType="numeric"
            />
            <Text style={styles.whiteText}>lb</Text>
          </View>
        </View>
        <View style={styles.exerciseSets}></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.resetExerciseText}>Reset Exercise</Text>
      </View>
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

  exerciseWeight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputWeightContainer: {
    flexDirection: "row",
    alignItems: "center",
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
