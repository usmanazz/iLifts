import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FloatActionButton } from "../components/FloatActionButton";
import { HistoryCard } from "../components/HistoryCard";
import { RootStoreContext } from "../stores/RootStore";

export const WorkoutHistoryScreen = observer(({ navigation }) => {
  const rootStore = useContext(RootStoreContext);

  const logAsyncData = async () => {
    try {
      console.log(await AsyncStorage.getItem("workout"));
    } catch (err) {
      console.error("error logging data");
    }
  };

  const clearAppData = async function () {
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // await AsyncStorage.multiRemove(keys);
      rootStore.workoutStore.history = [];
      console.log(await AsyncStorage.getItem("workout"));
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.scrollContainer}
        contentContainerStyle={{
          alignItems: "center",
          flex: rootStore.workoutStore.history.length === 0 ? 1 : null,
          justifyContent:
            rootStore.workoutStore.history.length === 0 ? "center" : null,
        }}
      >
        <Button title="log data" onPress={logAsyncData} />

        {rootStore.workoutStore.history.length > 0 ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={clearAppData}
          >
            <Text style={styles.buttonText}>Delete All</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.message}>
            No saved workouts. Complete workouts to add here!
          </Text>
        )}

        {/* {rootStore.workoutStore.history.map((workout) => {
        return Object.entries(workout).map(([dt, v]) => {
          console.log(dt, " VALUE: ", v);
          <HistoryCard key={dt} date={dt} currentExercises={v} />;
        });
      })} */}

        {rootStore.workoutStore.history.map((workout, idx) => {
          const workoutInfoAsArr = Object.entries(workout);
          {
            /* console.log("OBJ TO ARRAY::::::: ", workoutInfoAsArr[0][1]); */
          }
          return (
            <HistoryCard
              onPress={() => {
                navigation.navigate("CurrentWorkout", {
                  date: workoutInfoAsArr[0][0],
                });
              }}
              key={workoutInfoAsArr[0][0] + idx}
              date={workoutInfoAsArr[0][0]}
              currentExercises={workoutInfoAsArr[0][1]}
            />
          );
        })}
      </ScrollView>

      <FloatActionButton
        onPress={() => {
          if (!rootStore.workoutStore.hasCurrentWorkout) {
            const {
              currentBarbellRow,
              currentBenchPress,
              currentDeadlift,
              currentOverheadPress,
              currentSquat,
            } = rootStore.workoutStore;
            const emptySets = [
              { reps: "5", state: "inactive" },
              { reps: "5", state: "inactive" },
              { reps: "5", state: "inactive" },
              { reps: "5", state: "inactive" },
              { reps: "5", state: "inactive" },
            ];

            if (rootStore.workoutStore.lastWorkoutDay === 1) {
              rootStore.workoutStore.currentExercises.push(
                {
                  exercise: "Squat",
                  numSets: 5,
                  reps: 5,
                  sets: [...emptySets],
                  weight: currentSquat,
                },
                {
                  exercise: "Bench Press",
                  numSets: 5,
                  reps: 5,
                  sets: [...emptySets],
                  weight: currentBenchPress,
                },
                {
                  exercise: "Deadlift",
                  numSets: 3,
                  reps: 5,
                  sets: [
                    { reps: "5", state: "inactive" },
                    { reps: "5", state: "inactive" },
                    { reps: "5", state: "inactive" },
                    { reps: "X", state: "inactive" },
                    { reps: "X", state: "inactive" },
                  ],
                  weight: currentDeadlift,
                }
              );

              rootStore.workoutStore.currentSquat += 5;
              rootStore.workoutStore.currentBenchPress += 5;
              rootStore.workoutStore.currentDeadlift += 5;
            } else {
              rootStore.workoutStore.currentExercises.push(
                {
                  exercise: "Squat",
                  numSets: 5,
                  reps: 5,
                  sets: [...emptySets],
                  weight: currentSquat,
                },
                {
                  exercise: "Overhead Press",
                  numSets: 5,
                  reps: 5,
                  sets: [...emptySets],
                  weight: currentOverheadPress,
                },
                {
                  exercise: "Barbell Row",
                  numSets: 5,
                  reps: 5,
                  sets: [...emptySets],
                  weight: currentBarbellRow,
                }
              );

              rootStore.workoutStore.currentSquat += 5;
              rootStore.workoutStore.currentOverheadPress += 5;
              rootStore.workoutStore.currentBarbellRow += 5;
            }

            // change workout day
            rootStore.workoutStore.lastWorkoutDay =
              rootStore.workoutStore.lastWorkoutDay === 0 ? 1 : 0;
          }

          navigation.navigate("CurrentWorkout");
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    width: "85%",
    backgroundColor: "#30d158",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
  },

  message: {
    color: "#fff",
    fontSize: 18,
    marginHorizontal: 10,
  },

  scrollContainer: {
    width: "100%",
  },
});
