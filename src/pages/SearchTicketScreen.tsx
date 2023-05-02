import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, Button } from "react-native";
import OnlyGoSearchTicket from "../components/OnlyGoSearchTicket";
import RoundTipSearchTicket from "../components/RoundTipSearchTicket";
import { logOut } from "../state/slices/authSlice";
import { useAppDispatch } from "../state/store";

const SearchTicketScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [onlyGo, setOnlyGo] = useState(true);
  const turkishCities = ["adana", "istanbul", "zonguldak", "ankara"];
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    return formattedDate;
  };

  return (
    <View style={{ display: "flex" }}>
      <Text>Only Go</Text>
      <Switch value={onlyGo} onValueChange={() => setOnlyGo(!onlyGo)} />
      <Text>Round Trip</Text>
      {onlyGo ? (
        <OnlyGoSearchTicket
          turkishCities={turkishCities}
          formatDate={formatDate}
        />
      ) : (
        <RoundTipSearchTicket
          turkishCities={turkishCities}
          formatDate={formatDate}
        />
      )}
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logOut());
        }}
      />
    </View>
  );
};

export default SearchTicketScreen;

const styles = StyleSheet.create({});
