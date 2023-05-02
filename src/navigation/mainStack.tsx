import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchTicketScreen from "../pages/SearchTicketScreen";
import ServiceDataScreen from "../pages/ServiceDataScreen";
import BusServiceListScreen from "../pages/BusServiceListScreen";
import PaymentScreen from "../pages/PaymentScreen";
import SucsessScreen from "../pages/SucsessScreen";
const Stack = createNativeStackNavigator();

export const MainStack = () => (
  <Stack.Navigator initialRouteName="deneme">
    <Stack.Screen
      name="searchTicket"
      component={SearchTicketScreen}
    />
    <Stack.Screen name="serviceData" component={ServiceDataScreen} />
    <Stack.Screen
      name="busServiceList"
      component={BusServiceListScreen}
    />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="sucsess" component={SucsessScreen} />
  </Stack.Navigator>
);