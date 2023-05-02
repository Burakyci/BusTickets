import { IOperationResult, OperationResult } from "../models/commonModel";
import { IBusData } from "../type/index";
import busData from "../Data.json";

class BusService {
  getBususData = (): OperationResult<IBusData[]> => {
    try {
      const data = busData;
      return new OperationResult({
        success: false,
        data: busData as IBusData[],
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
}

export default new BusService();
