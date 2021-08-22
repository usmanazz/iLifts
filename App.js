import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configure } from "mobx";
import { observer } from "mobx-react-lite";
import { WorkoutHistoryScreen } from "./src/screens/WorkoutHistoryScreen";
import { CurrentWorkoutScreen } from "./src/screens/CurrentWorkoutScreen";
import { EditExerciseScreen } from "./src/screens/EditExerciseScreen";
import dayjs from "dayjs";

configure({
  enforceActions: "never",
});

const Stack = createNativeStackNavigator();

const App = observer(() => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Stack.Navigator
        initialRouteName="WorkoutHistory"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#121212" },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
          },
          headerTintColor: "#30d158",
        }}
      >
        <Stack.Screen
          name="CurrentWorkout"
          component={CurrentWorkoutScreen}
          options={({ route }) =>
            route.params.date !== ""
              ? {
                  title: dayjs(route.params.date.split("T")[0]).format(
                    "MMM DD, YYYY"
                  ),
                }
              : { title: "Current Workout" }
          }
          initialParams={{ date: "" }}
        />
        <Stack.Screen
          name="WorkoutHistory"
          component={WorkoutHistoryScreen}
          options={{
            title: "Workout History",
          }}
        />

        <Stack.Screen
          name="EditExercise"
          component={EditExerciseScreen}
          options={({ route }) => ({
            title: `Edit ${route.params.exercise}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
