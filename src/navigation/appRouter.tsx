import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { getBusesData } from "../state/slices/busSlice";
import { initUser } from "../state/slices/authSlice";
import { AuthStack } from "./authStack";
import { MainStack } from "./mainStack";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { busesData } = useSelector((state: RootState) => state.busSlice);

  useEffect(() => {
    setLoading(false);
    if (!Array.isArray(busesData)) {
      dispatch(getBusesData());
    }
  }, [busesData]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(initUser());
    }, [navigation])
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : !user ? (
        <AuthStack />
      ) : (
        <MainStack />
      )}
    </>
  );
};

export default AppRouter;

const styles = StyleSheet.create({});
