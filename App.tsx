import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import AppRouter from "./src/navigation/appRouter";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
