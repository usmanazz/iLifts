import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const SaveButton = ({ handleSave }) => {
  return (
    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  saveButton: {
    position: "absolute",
    bottom: 40,
    height: 45,
    width: "85%",
    backgroundColor: "#30d158",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
});
