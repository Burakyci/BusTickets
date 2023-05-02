import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { onlyGoSchema } from "../helpers/validation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { IBusData, IPropSearchTicket, ITargetService } from "../type";
import { setTargetServiceData } from "../state/slices/busSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";

const OnlyGoSearchTicket: React.FC<IPropSearchTicket> = ({
  turkishCities,
  formatDate,
}) => {
  const { busesData } = useSelector((state: RootState) => state.busSlice);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataExists, setDataExists] = useState<Boolean | null>(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const checkIfDataExists = (from: string, to: string, date: string) => {
    const found = busesData?.some(
      (item: IBusData) =>
        item.from === from && item.to === to && item.date == date
    );
    return found;
  };

  const handleSearch = (from: string, to: string, date: string) => {
    const exists: boolean | undefined = checkIfDataExists(from, to, date);
    setDataExists(exists as boolean);

    if (exists) {
      const foundBuses = busesData?.filter(
        (item: IBusData) =>
          item.from === from && item.to === to && item.date == date
      );

      if (foundBuses && foundBuses.length > 0) {
        const data: ITargetService = {
          go: foundBuses,
        };
        dispatch(setTargetServiceData(data));
      }
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onlyGo = {
    from: "deneme@deneme.com",
    to: "123123",
    departureDate: new Date(),
  };

  return (
    <View>
      <Formik
        validationSchema={onlyGoSchema}
        initialValues={onlyGo}
        onSubmit={(values) => {
          const { from, to, departureDate } = values;
          const res = handleSearch(
            from,
            to,
            formatDate(departureDate).toString()
          );
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <View>
            <Text>From</Text>
            <Picker
              style={styles.input}
              selectedValue={values.from}
              onValueChange={(itemValue) => {
                handleChange("from")(itemValue);
                setDataExists(null); // Değer değiştiğinde dataExists'i null yap
              }}
            >
              {turkishCities.map((city: string) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>

            <Text>To</Text>
            <Picker
              style={styles.input}
              selectedValue={values.to}
              onValueChange={(itemValue) => {
                handleChange("to")(itemValue);
                setDataExists(null); // Değer değiştiğinde dataExists'i null yap
              }}
            >
              {turkishCities.map((city: string) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
            <View style={styles.datePickerContainer}>
              <Button onPress={openDatePicker} title="Depart Date" />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.departureDate} // values.departureDate kullanın
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDataExists(null);
                    const currentDate = selectedDate || values.departureDate;
                    setFieldValue("departureDate", currentDate); // setFieldValue ile değeri güncelleyin
                    setShowDatePicker(false);
                  }}
                />
              )}
            </View>

            <Text style={styles.dateText}>
              {values.departureDate.toDateString()}
            </Text>
            <Button onPress={handleSubmit as () => void} title="SEARCH" />
            <Text>{" _"}</Text>
          </View>
        )}
      </Formik>

      <View>
        {dataExists !== null ? (
          dataExists ? (
            <View>
              <Button
                onPress={() => {
                  navigation.dispatch(CommonActions.navigate("busServiceList"));
                  setDataExists(null);
                }}
                title="Choose Service"
              />
            </View>
          ) : (
            <Text style={styles.errorText}>Service Not Found</Text>
          )
        ) : null}
      </View>
    </View>
  );
};

export default OnlyGoSearchTicket;

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    marginBottom: 10,
    fontSize: 16,
    fontStyle: "italic",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
