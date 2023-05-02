import React from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { signupSchema } from "../helpers/validation";
import { saveUser } from "../state/slices/authSlice";
import { useAppDispatch } from "../state/store";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SignupScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const initialValues = {
    firstName: "",
    lastName: "",
    tc: "",
    birthDate: "",
    gender: "",
    email: "deneme@deneme.com",
    password: "123123",
    secondPassword: "123123",
  };

  return (
    <View>
      <Formik
        validationSchema={signupSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(saveUser(values));
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
              style={styles.input}
              placeholder="firstName"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName ? (
              <Text style={styles.error}>{errors.firstName}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="lastName"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName ? (
              <Text style={styles.error}>{errors.lastName}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="tc"
              onChangeText={handleChange("tc")}
              onBlur={handleBlur("tc")}
              value={values.tc}
            />
            {touched.tc && errors.tc ? (
              <Text style={styles.error}>{errors.tc}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="birthDate"
              onChangeText={handleChange("birthDate")}
              onBlur={handleBlur("birthDate")}
              value={values.birthDate}
            />
            {touched.birthDate && errors.birthDate ? (
              <Text style={styles.error}>{errors.birthDate}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="gender"
              onChangeText={handleChange("gender")}
              onBlur={handleBlur("gender")}
              value={values.gender}
            />
            {touched.gender && errors.gender ? (
              <Text style={styles.error}>{errors.gender}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="gender"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="secondPassword"
              onChangeText={handleChange("secondPassword")}
              onBlur={handleBlur("secondPassword")}
              value={values.secondPassword}
            />
            {touched.secondPassword && errors.secondPassword ? (
              <Text style={styles.error}>{errors.secondPassword}</Text>
            ) : null}
            <Button onPress={handleSubmit as () => void} title="Login" />
          </View>
        )}
      </Formik>
      <Button
        title="sign"
        onPress={() => {
          navigation.dispatch(CommonActions.navigate("Login"));
        }}
      />
    </View>
  );
};

export default SignupScreen;

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
