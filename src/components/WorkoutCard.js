import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const WorkoutCard = observer(
  ({ date, exercise, repsAndWeight, sets, onSetPress, navigation }) => {
    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.topRowText}>{exercise}</Text>

          <View style={styles.topRowRightHeader}>
            <Text style={[styles.topRowText, styles.setsAndWeight]}>
              {repsAndWeight}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditExercise", {
                  date: date,
                  exercise: exercise,
                })
              }
            >
              <AntDesign name="right" size={18} color="#30d158" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomRow}>
          {sets.map((set, index) => {
            if (set.reps === "X")
              return (
                <View style={[styles.circle, styles.cancelledSet]} key={index}>
                  <Text style={[styles.circleText, styles.grayText]}>X</Text>
                </View>
              );

            if (set.reps === "5" && set.state === "inactive")
              return (
                <TouchableOpacity
                  onPress={() => onSetPress(index)}
                  style={[styles.circle, styles.inactiveSet]}
                  key={index}
                >
                  <Text style={[styles.inactiveText, styles.grayText]}>
                    {set.reps}
                  </Text>
                </TouchableOpacity>
              );

            return (
              <TouchableOpacity
                onPress={() => onSetPress(index)}
                style={styles.circle}
                key={index}
              >
                <Text style={[styles.whiteText, styles.circleText]}>
                  {set.reps}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancelledSet: {
    backgroundColor: "#1c1c1e",
  },

  grayText: {
    color: "#636366",
  },

  card: {
    width: "90%",
    padding: 10,
    marginBottom: 15,
  },

  circle: {
    backgroundColor: "#30d158",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  circleText: {
    fontSize: 20,
  },

  inactiveSet: {
    backgroundColor: "#222224",
  },

  inactiveText: {
    fontSize: 16,
  },

  setsAndWeight: {
    marginRight: 5,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topRowRightHeader: {
    flexDirection: "row",
  },

  topRowText: {
    fontSize: 16,
    color: "#fff",
  },

  whiteText: {
    color: "#fff",
  },
});
