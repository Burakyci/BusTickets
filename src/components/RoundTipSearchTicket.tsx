import { StyleSheet, Text, View, Button, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { Children, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { roundTripSchema } from "../helpers/validation";
import { RootState, useAppDispatch } from "../state/store";
import { useSelector } from "react-redux";
import { IBusData, IPropSearchTicket, ITargetService } from "../type";
import { setTargetServiceData } from "../state/slices/busSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";

const RoundTipSearchTicket: React.FC<IPropSearchTicket> = ({
  turkishCities,
  formatDate,
}) => {
  const [datePickerGo, setDatePickerGo] = useState<Boolean>(false);
  const [datePickerReturn, setDatePickerReturn] = useState<Boolean>(false);

  const [dataExists, setDataExists] = useState<Boolean | null>(null);
  const { busesData } = useSelector((state: RootState) => state.busSlice);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const checkIfDataExists = (
    from: string,
    to: string,
    date: string,
    returnDate: string
  ) => {
    const foundOnlyGo = busesData?.some(
      (item: IBusData) =>
        item.from === from && item.to === to && item.date == date
    );
    const foundRetrun = busesData?.some(
      (item: IBusData) =>
        item.from === to && item.to === from && item.date == returnDate
    );

    if (foundOnlyGo && foundRetrun) {
      return true;
    } else {
      return false;
    }
  };

  const handleSearch = (
    from: string,
    to: string,
    date: string,
    returnDate: string
  ) => {
    const exists = checkIfDataExists(from, to, date, returnDate);
    setDataExists(exists);

    if (exists) {
      const foundOutwardBuses = busesData?.filter(
        (item: IBusData) =>
          item.from === from && item.to === to && item.date == date
      );
      const foundReturnBuses = busesData?.filter(
        (item: IBusData) =>
          item.from === to && item.to === from && item.date == returnDate
      );

      console.log("Outward Buses:", foundOutwardBuses);
      console.log("Return Buses:", foundReturnBuses);

      if (
        foundOutwardBuses !== undefined &&
        foundOutwardBuses.length > 0 &&
        foundReturnBuses !== undefined &&
        foundReturnBuses.length > 0
      ) {
        const data: ITargetService = {
          go: foundOutwardBuses,
          return: foundReturnBuses,
        };

        dispatch(setTargetServiceData(data));
      }
    }
  };

  const roundTrip = {
    from: "",
    to: "",
    departureDate: new Date(),
    returnDate: new Date(),
  };

  const openDatePickerGo = () => {
    setDatePickerGo(true);
  };
  const openDatePickerReturn = () => {
    setDatePickerReturn(true);
  };

  return (
    <View>
      <Formik
        validationSchema={roundTripSchema}
        initialValues={roundTrip}
        onSubmit={(values) => {
          const { from, to, departureDate, returnDate } = values;
          const res = handleSearch(
            from,
            to,
            formatDate(departureDate).toString(),
            formatDate(returnDate).toString()
          );
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            <Text>From</Text>
            <Picker
              style={styles.input}
              selectedValue={values.from}
              onValueChange={(itemValue) => {
                handleChange("from")(itemValue);
                setDataExists(null);
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
                setDataExists(null);
              }}
            >
              {turkishCities.map((city: string) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
            {touched.to && errors.to ? (
              <Text style={styles.errorText}>{errors.to}</Text>
            ) : null}
            {/* GoDate */}
            <View style={styles.datePickerContainer}>
              <Button onPress={openDatePickerGo} title="Show Date Picker" />
              {datePickerGo && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.departureDate} // values.departureDate kullanın
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDataExists(null);
                    const currentDate = selectedDate || values.departureDate;
                    setFieldValue("departureDate", currentDate); // setFieldValue ile değeri güncelleyin
                    setDatePickerGo(false);
                  }}
                />
              )}
            </View>
            <Text style={styles.dateText}>
              Go Date: {values.departureDate.toDateString()}
            </Text>
            <View style={styles.datePickerContainer}>
              <Button onPress={openDatePickerReturn} title="Show Date Picker" />
              {datePickerReturn && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.returnDate} // values.returnDate kullanın
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDataExists(null);
                    const currentDate = selectedDate || values.returnDate;
                    setFieldValue("returnDate", currentDate); // setFieldValue ile değeri güncelleyin
                    setDatePickerReturn(false);
                  }}
                />
              )}
            </View>
            <Text style={styles.dateText}>
              Return Date : {values.returnDate.toDateString()}
            </Text>

            <Button onPress={handleSubmit as () => void} title="SERCH" />
            <Text> </Text>
          </View>
        )}
      </Formik>
      <View>
        {dataExists !== null ? (
          dataExists ? (
            <Button
              onPress={() => {
                navigation.dispatch(CommonActions.navigate("busServiceList"));
                setDataExists(null);
              }}
              title="Choose Service"
            />
          ) : (
            <Text style={styles.errorText}>Service Not Found</Text>
          )
        ) : null}
      </View>
    </View>
  );
};

export default RoundTipSearchTicket;

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
