import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { Formik, FormikValues } from "formik";
import { paymentSchema } from "../helpers/validation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Spinner from "../components/Spinner";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { IPaymentFormValues } from "../type";

const PaymentScreen: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { totalPrice } = useSelector((state: RootState) => state.busSlice);
  const [loading, setLoading] = useState<Boolean>(false);
  const navigation = useNavigation();
  // console.log(totalPrice);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const handlePayment = async (values: IPaymentFormValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    navigation.dispatch(CommonActions.navigate("sucsess"));
  };
  console.log(totalPrice);

  const initialValues: IPaymentFormValues = {
    cardNumber: "",
    expiryDate: new Date(),
    cvv: "",
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={paymentSchema}
          onSubmit={handlePayment}
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                onChangeText={handleChange("cardNumber")}
                value={values.cardNumber}
              />
              {touched.cardNumber && errors.cardNumber && (
                <Text style={styles.error}>{errors.cardNumber}</Text>
              )}

              <View>
                <Button onPress={openDatePicker} title="Show Date Picker" />
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={values.expiryDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || values.expiryDate;
                      setFieldValue("expiryDate", currentDate);
                      setShowDatePicker(false);
                    }}
                  />
                )}
              </View>
              <Text>{values.expiryDate.toDateString()}</Text>

              <TextInput
                style={styles.input}
                placeholder="CVV"
                onChangeText={handleChange("cvv")}
                value={values.cvv}
              />
              {touched.cvv && errors.cvv && (
                <Text style={styles.error}>{errors.cvv}</Text>
              )}

              <Button title="Submit" onPress={handleSubmit as () => void} />
            </View>
          )}
        </Formik>
      )}
      <Text> {totalPrice?.toString()}TL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default PaymentScreen;
