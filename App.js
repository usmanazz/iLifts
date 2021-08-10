import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { configure } from "mobx";
import { observer } from "mobx-react-lite";
import { WorkoutHistoryScreen } from "./src/screens/WorkoutHistoryScreen";
import { CurrentWorkoutScreen } from "./src/screens/CurrentWorkoutScreen";
import { CounterStoreContext } from "./src/stores/CounterStore";

configure({
  enforceActions: "never",
});

const Stack = createNativeStackNavigator();

const App = observer(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WorkoutHistory"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CurrentWorkout" component={CurrentWorkoutScreen} />
        <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
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
