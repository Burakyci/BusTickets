import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBusData, IInitialStateBus, ITargetService } from "../../type/index";
import BusService from "../../services/busService";
import { number } from "yup";

const initialState: IInitialStateBus = {
  busesData: undefined,
  targetServiceData: null,
  pickupId: [],
  totalPrice: 0,
};

export const busSlice = createSlice({
  name: "busSlice",
  initialState,
  reducers: {
    getBusesData: (state) => {
      const responseData = BusService.getBususData();

      if (responseData && responseData.data) {
        state.busesData = responseData.data as IBusData[];
      }
    },
    setTargetServiceData: (state, action: PayloadAction<ITargetService>) => {
      state.targetServiceData = action.payload;
    },
    pickupId: (state, action: PayloadAction<(number | undefined)[]>) => {
      state.pickupId = action.payload;
    },
    getTotalPrice: (state, action) => {
      state.totalPrice = action.payload as number;
    },
  },
});

export const { getBusesData, setTargetServiceData, pickupId, getTotalPrice } =
  busSlice.actions;

export default busSlice.reducer;
