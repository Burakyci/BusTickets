import { OperationResult } from "../models/commonModel";
import { IUserData } from "../type";
import UserData from "../UserData.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
class UserService {
  initUser = async (): Promise<OperationResult<IUserData>> => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        return new OperationResult({ success: true, data: JSON.parse(data) });
      } else {
        return new OperationResult({ success: false, message: "notFoundData" });
      }
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };

  saveUser = async (user: IUserData): Promise<OperationResult<IUserData>> => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return new OperationResult({ success: true, data: user });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };

  removeUser = async (): Promise<OperationResult<boolean>> => {
    try {
      await AsyncStorage.removeItem("user");
      return new OperationResult({ success: true, data: true });
    } catch (error: any) {
      return new OperationResult({ success: false, message: error.message });
    }
  };

  login = (
    email: string,
    password: string
  ): OperationResult<IUserData> => {
    try {
      const data: IUserData = UserData;
      if (data.email === email && data.password === password) {
        return new OperationResult({
          success: true,
          data: UserData,
        });
      } else {
        return new OperationResult({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
}

export default new UserService();
