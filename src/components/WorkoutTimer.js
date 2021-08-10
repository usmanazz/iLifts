import React from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const WorkoutTimer = ({
  currentTime,
  onDeletePress,
  percentProgressLine,
}) => {
  //   console.log(percentProgressLine);
  return (
    <View style={styles.container}>
      <View style={[styles.progressLine, { width: percentProgressLine }]} />

      <View style={styles.row}>
        <Text style={styles.timeText}>{currentTime}</Text>
        <TouchableWithoutFeedback onPress={onDeletePress}>
          <View style={styles.deleteButtonContainer}>
            <Text style={styles.deleteButton}>X</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#2c2c2e",
    height: 60,
    width: "90%",
    borderRadius: 9,
  },

  deleteButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },

  deleteButtonContainer: {
    backgroundColor: "#48484a",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  progressLine: {
    height: 3,
    backgroundColor: "#30d158",
  },

  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
  },

  timeText: {
    fontSize: 20,
    color: "#fff",
  },
});
