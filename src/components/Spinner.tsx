import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const Spinner: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
