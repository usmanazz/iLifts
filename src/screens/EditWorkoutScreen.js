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

export const EditWorkoutScreen = observer(({ route, navigation }) => {
  const rootStore = useContext(RootStoreContext);
  const { date } = route.params;

  const deleteWorkout = () => {
    try {
      rootStore.workoutStore.history = rootStore.workoutStore.history.filter(
        (workout) => Object.keys(workout)[0] !== date
      );
      navigation.navigate("WorkoutHistory");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="delete workout" onPress={deleteWorkout} />
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
});
