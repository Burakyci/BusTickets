import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../pages/LoginScreen";
import SignupScreen from "../pages/SignupScreen";

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator initialRouteName="login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>);