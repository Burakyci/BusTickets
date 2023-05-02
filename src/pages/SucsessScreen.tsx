import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SucsessScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Payment Successful!</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.dispatch(CommonActions.navigate("searchTicket"));
        }}
      />
    </View>
  );
};

export default SucsessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
