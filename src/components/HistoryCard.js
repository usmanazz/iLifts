import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { generateCompletedExerciseString } from "../util/HistoryCardFunctions";

export const HistoryCard = observer(({ date, currentExercises, onPress }) => {
  const dateWithoutTime = date.split("T");
  const dateWithMonthName = dayjs(dateWithoutTime[0]).format("MMM DD YYYY");

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.grayText}>Workout</Text>
        <Text style={styles.grayText}>
          {" "}
          {dateWithoutTime[0] === dayjs().format("YYYY-MM-DD")
            ? "Today,"
            : null}{" "}
          {dateWithMonthName}
        </Text>
      </View>

      <View style={styles.exerciseContainer}>
        {currentExercises.map((ce, idx) => {
          const setsAndReps = generateCompletedExerciseString(
            ce.numSets,
            ce.sets
          );

          return (
            <View
              key={ce.exercise}
              style={[
                styles.exercise,
                idx !== currentExercises.length - 1 ? styles.divider : null,
              ]}
            >
              <Text style={[styles.whiteText, styles.lineHeight]}>
                {ce.exercise}
              </Text>
              <Text
                style={[styles.whiteText, styles.lineHeight]}
              >{`${setsAndReps} ${ce.weight}lb`}</Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
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

  exercise: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  exerciseContainer: {
    marginTop: 8,
  },

  grayText: {
    color: "#8e8e93",
  },

  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  lineHeight: {
    paddingVertical: 5,
  },

  whiteText: {
    color: "#fff",
    fontSize: 18,
  },
});
