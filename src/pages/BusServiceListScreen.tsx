import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../state/store";
import { useSelector } from "react-redux";
import { pickupId } from "../state/slices/busSlice";
import { Button } from "react-native-elements";
import { CommonActions, useNavigation } from "@react-navigation/native";

const BusServiceListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [itemIds, setItemIds] = useState<(number | undefined)[]>([
    undefined,
    undefined,
  ]);

  const dispatch = useAppDispatch();
  const { targetServiceData } = useSelector(
    (state: RootState) => state.busSlice
  );

  const goAndReturn = (id: number, index: number) => {
    setItemIds((prev: (number | undefined)[]) => {
      const updatedItemIds = [...prev];
      updatedItemIds[index] = id;
      return updatedItemIds;
    });
  };

  const navigateToDetails = (itemId: (number | undefined)[]) => {
    dispatch(pickupId(itemId));
    navigation.dispatch(CommonActions.navigate("serviceData"));
  };

  return (
    <View>
      {itemIds?.map((value) => (
        <Text key={value}>{value?.toString()}</Text>
      ))}
      <Text>Go</Text>
      {targetServiceData?.go.map((value, key) => (
        <TouchableOpacity
          key={value.id}
          onPress={() => goAndReturn(value.id, 0)}
          style={itemIds[0] === value.id ? styles.selectedItem : null}
        >
          <Text>
            {key + 1} From: {value.from} {"=>"} To:{value.to}{" "}
            {value.companyName} {value.departure} Empty Seat :
            {value.seatsData.filter((item) => item === 3).length}{" "}
            {value.price.toString()}TL
          </Text>
        </TouchableOpacity>
      ))}
      {targetServiceData?.return && (
        <>
          <Text>Return</Text>
          {targetServiceData.return.map((value, key) => (
            <TouchableOpacity
              key={value.id}
              onPress={() => goAndReturn(value.id, 1)}
              style={itemIds[1] === value.id ? styles.selectedItem : null}
            >
              <Text>
                {key + 1} From: {value.from} {"=>"} To:{value.to}{" "}
                {value.companyName} {value.departure} Empty Seat :
                {value.seatsData.filter((item) => item === 3).length}{" "}
                {value.price.toString()}TL
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
      <Button onPress={() => setItemIds([])} title="Clear Selection" />
      {(targetServiceData?.return &&
        itemIds[0] !== undefined &&
        itemIds[1] !== undefined) ||
      (!targetServiceData?.return && itemIds[0] !== undefined) ? (
        <Button
          onPress={() => navigateToDetails(itemIds)}
          title={"Choose Seat"}
        />
      ) : null}
    </View>
  );
};

export default BusServiceListScreen;

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: "#00FF00",
  },
});
