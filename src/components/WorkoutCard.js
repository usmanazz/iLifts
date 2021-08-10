import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const WorkoutCard = observer(
  ({ exercise, repsAndWeight, sets, onSetPress }) => {
    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.topRowText}>{exercise}</Text>
          <Text style={styles.topRowText}>{repsAndWeight}</Text>
        </View>

        <View style={styles.bottomRow}>
          {sets.map((set, index) => {
            if (set === "X")
              return (
                <View style={[styles.circle, styles.cancelledSet]} key={index}>
                  <Text style={[styles.circleText, styles.cancelledText]}>
                    X
                  </Text>
                </View>
              );

            if (set === "")
              return (
                <TouchableOpacity
                  onPress={() => onSetPress(index)}
                  style={[styles.circle, styles.inactiveSet]}
                  key={index}
                />
              );

            return (
              <TouchableOpacity
                onPress={() => onSetPress(index)}
                style={styles.circle}
                key={index}
              >
                <Text style={[styles.whiteText, styles.circleText]}>{set}</Text>
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

  cancelledText: {
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

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topRowText: {
    fontSize: 16,
    color: "#fff",
  },

  whiteText: {
    color: "#fff",
  },
});
