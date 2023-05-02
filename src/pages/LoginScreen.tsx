import React from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { loginSchema } from "../helpers/validation";
import { useAppDispatch } from "../state/store";
import { login } from "../state/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

const LoginScreen: React.FC = () => {
  const [hasAccount, setHasAccount] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "deneme@deneme.com",
    password: "123123",
  };

  React.useEffect(() => {
    (async () => {
      const hasAccount = await AsyncStorage.getItem("hasAccount");
      setHasAccount(hasAccount === "true");
    })();
  }, []);

  return (
    <View>
      <Formik
        validationSchema={loginSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await AsyncStorage.setItem("hasAccount", "true");
          dispatch(login(values));
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor: !hasAccount ? "red" : "black",
              }}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={{
                ...styles.input,
                borderColor: !hasAccount ? "red" : "black",
              }}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            <Button onPress={handleSubmit as () => void} title="Login" />
          </View>
        )}
      </Formik>
      {!hasAccount ? (
        <View>
          <Text style={{ color: "red" }}>Don't have an account?</Text>
        </View>
      ) : null}

      <Button
        title="sign"
        onPress={() => {
          navigation.dispatch(CommonActions.navigate("Signup"));
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
  },
});
