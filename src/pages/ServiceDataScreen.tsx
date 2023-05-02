import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../state/store";
import { Button, Icon } from "react-native-elements";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { IBusData } from "../type";
import { getTotalPrice } from "../state/slices/busSlice";

const ServiceDataScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [showPopupGo, setShowPopupGo] = useState(false);
  const [showPopupReturn, setShowPopupReturn] = useState(false);
  const { user } = useSelector((state: RootState) => state.authSlice);

  const [selectedOption, setSelectedOption] = useState<null | number>();
  const [chosen, setChosen] = useState<number[]>([]);
  const [chosenReturn, setChosenReturn] = useState<number[]>([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const [selectedNumber, setSelectedNumber] = useState<null | number>(null);

  const { pickupId, busesData } = useSelector(
    (state: RootState) => state.busSlice
  );
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [selectedItemsReturn, setSelectedItemsReturn] = useState<number[]>([]);
  const [selectedBus, setSelectedBus] = useState<IBusData | undefined>(
    undefined
  );
  const [selectedBusReturn, setSelectedBusReturn] = useState<
    IBusData | undefined
  >(undefined);

  useEffect(() => {
    if (selectedBus === undefined && Array.isArray(busesData)) {
      if (pickupId[0] !== undefined) {
        const id = pickupId[0]!;
        setSelectedBus(busesData[id]);
      }
    }
  }, [busesData]);
  useEffect(() => {
    if (selectedBusReturn === undefined && Array.isArray(busesData)) {
      if (pickupId[1] !== undefined) {
        const id = pickupId[1]!;
        setSelectedBusReturn(busesData[id]);
      }
    }
  }, [busesData]);

  useEffect(() => {
    if (selectedBus && selectedItems.length == 0) {
      setSelectedItems(selectedBus.seatsData);
    }
  }, [selectedBus]);
  useEffect(() => {
    if (selectedBusReturn && selectedItemsReturn.length == 0) {
      setSelectedItemsReturn(selectedBusReturn.seatsData);
    }
  }, [selectedBus]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (selectedBus) {
      totalPrice += selectedBus.price * chosen.length;
      if (selectedBusReturn) {
        totalPrice = +selectedBusReturn.price + chosenReturn.length;
      }
    }
    dispatch(getTotalPrice(totalPrice));
  };

  const openPopupGo = () => {
    setShowPopupGo(true);
  };
  const closePopupGo = () => {
    setShowPopupGo(false);
    setSelectedNumber(null);
  };
  const openPopupReturn = () => {
    setShowPopupReturn(true);
  };
  const closePopupReturn = () => {
    setShowPopupReturn(false);
    setSelectedNumber(null);
  };

  const addSeatGo = (
    indexNumber: number,
    chosens: number[],
    setChosens: any,
    selectedItem: number[],
    setSelectedItem: any,
    selectBus: IBusData,
    whichOpenPupup: () => void
  ) => {
    let genderId: number;
    if (user?.gender == "female") genderId = 0;
    else genderId = 1;
    if (busesData !== undefined && busesData[0].seatsData[indexNumber] === 3) {
      if (chosens.includes(indexNumber)) {
        const newSelectedItems = [...selectedItem];
        newSelectedItems[indexNumber] = 3;
        const newCohosen = chosens.filter((c) => c !== indexNumber);
        setChosens(newCohosen);
        setSelectedItem(newSelectedItems);
      } else if (chosens.length < 10 && !chosens.includes(indexNumber)) {
        if (indexNumber % 3 == 0 || indexNumber === 0) {
          setChosens((prev: number[]) => [...prev, indexNumber]);
          const newSelectedItems = [...selectedItems];
          newSelectedItems[indexNumber] = genderId;
          setSelectedItem(newSelectedItems);
        } else if (
          (indexNumber % 3 == 1 &&
            selectBus?.seatsData[indexNumber + 1] === 3) ||
          (indexNumber % 3 == 2 && selectBus?.seatsData[indexNumber - 1] === 3)
        ) {
          setSelectedNumber(indexNumber);
          whichOpenPupup();
        } else if (
          indexNumber % 3 == 1 &&
          selectedItems[indexNumber + 1] === genderId
        ) {
          setChosens((prev: number[]) => [...prev, indexNumber]);
          const newSelectedItems = [...selectedItems];
          newSelectedItems[indexNumber] = genderId;
          setSelectedItem(newSelectedItems);
        } else if (
          indexNumber % 3 == 2 &&
          selectedItems[indexNumber] === genderId
        ) {
          setChosens((prev: number[]) => [...prev, indexNumber]);
          const newSelectedItems = [...selectedItems];
          newSelectedItems[indexNumber] = genderId;
          setSelectedItem(newSelectedItems);
        }
      }
    }
  };
  const addSeatFromModalGo = (indexNumber: number, genderNumber: number) => {
    setChosen((prev: number[]) => [...prev, indexNumber]);
    const newSelectedItems = [...selectedItems];
    if (selectedOption !== null) {
      newSelectedItems[indexNumber] = genderNumber;
      setSelectedItems(newSelectedItems);
    }
  };
  const addSeatFromModalReturn = (
    indexNumber: number,
    genderNumber: number
  ) => {
    setChosenReturn((prev: number[]) => [...prev, indexNumber]);
    const newSelectedItems = [...selectedItemsReturn];
    if (selectedOption !== null) {
      newSelectedItems[indexNumber] = genderNumber;
    }
    setSelectedItemsReturn(newSelectedItems);
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>Gidis</Text>
          {selectedItems ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {selectedItems?.map((value, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    if (selectedBus) {
                      addSeatGo(
                        key,
                        chosen,
                        setChosen,
                        selectedItems,
                        setSelectedItems,
                        selectedBus,
                        openPopupGo
                      );
                    }
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    borderColor: "black",
                    borderWidth: 2,
                  }}
                >
                  <Text>{key.toString()}</Text>

                  {value === 0 && (
                    <Icon
                      name="female"
                      type="font-awesome"
                      size={20}
                      color="pink"
                    />
                  )}
                  {value === 1 && (
                    <Icon
                      name="male"
                      type="font-awesome"
                      size={20}
                      color="blue"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>

        <View style={{ width: 1, backgroundColor: "black" }} />

        <View style={{ flex: 1 }}>
          <Text>Donus</Text>
          {selectedItemsReturn ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {selectedItemsReturn?.map((value, key) => (
                <TouchableOpacity
                  onPress={() => {
                    if (selectedBusReturn)
                      addSeatGo(
                        key,
                        chosenReturn,
                        setChosenReturn,
                        selectedItemsReturn,
                        setSelectedItemsReturn,
                        selectedBusReturn,
                        openPopupReturn
                      );
                  }}
                  key={key}
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    borderColor: "black",
                    borderWidth: 2,
                  }}
                >
                  <Text>{key.toString()}</Text>

                  {value === 0 && (
                    <Icon
                      name="female"
                      type="font-awesome"
                      size={20}
                      color="pink"
                    />
                  )}
                  {value === 1 && (
                    <Icon
                      name="male"
                      type="font-awesome"
                      size={20}
                      color="blue"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
      <View>
        <Text>{user?.gender}</Text>

        <Text>Seat Number :</Text>
        {chosen.map((value, key) => (
          <View key={key}>
            <Text>{value}</Text>
          </View>
        ))}
        <Text>Seat Number :</Text>
        {chosenReturn.map((value, key) => (
          <View key={key}>
            <Text>{value}</Text>
          </View>
        ))}
      </View>
      {/* go */}
      <Modal visible={showPopupGo} animationType="slide">
        <View style={styles.popupContainer}>
          <TouchableOpacity
            onPress={() => {
              if (selectedNumber) {
                addSeatFromModalGo(selectedNumber, 1);
              }
            }}
          >
            <Icon name="male" type="font-awesome" size={50} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedOption(1);
              if (selectedNumber) {
                addSeatFromModalGo(selectedNumber, 0);
              }
            }}
          >
            <Icon name="female" type="font-awesome" size={50} color="blue" />
          </TouchableOpacity>
          <Button onPress={closePopupGo} title={"close popup"} />
        </View>
      </Modal>
      {/* return */}
      <Modal visible={showPopupReturn} animationType="slide">
        <View style={styles.popupContainer}>
          <TouchableOpacity
            onPress={() => {
              if (selectedNumber) {
                addSeatFromModalReturn(selectedNumber, 1);
              }
            }}
          >
            <Icon name="male" type="font-awesome" size={50} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedOption(1);
              if (selectedNumber) {
                addSeatFromModalReturn(selectedNumber, 0);
              }
            }}
          >
            <Icon name="female" type="font-awesome" size={50} color="blue" />
          </TouchableOpacity>
          <Button onPress={closePopupReturn} title={"close popup"} />
        </View>
      </Modal>
      <Text>
        {selectedBus &&
          selectedBus.price * chosen.length +
            (selectedBusReturn?.price
              ? selectedBusReturn.price * chosenReturn.length
              : 0)}
        TL
      </Text>
      {(selectedItems[0] && chosen.length >= 1) ||
      (selectedItemsReturn?.[0] &&
        chosen.length >= 1 &&
        chosenReturn.length >= 1) ? (
        <Button
          title="Payment"
          onPress={() => {
            calculateTotalPrice();
            navigation.dispatch(CommonActions.navigate("PaymentScreen"));
          }}
        />
      ) : null}
    </ScrollView>
  );
};

export default ServiceDataScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    width: "30%",
    alignItems: "center",
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
