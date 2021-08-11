import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="log data" onPress={logAsyncData} />
      <Button title="clear async storage" onPress={clearAppData} />
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    // justifyContent: "center",
  },
});
