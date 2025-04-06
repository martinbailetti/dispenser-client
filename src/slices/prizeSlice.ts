import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  winPrize: 0,
  available_money: false,
  status: "PROCESSING",
  enable_collect: false,
  type: "",
  remainingMoneyToDispense: 0,
  quantity: 0,
  imageUrl: "",
  title: "",
  already_claimed: false,
};

export const prizeSlice = createSlice({
  name: "prize",
  initialState: initialState,
  reducers: {
    setPrize: (state, action) => {
      return { ...state, ...action.payload, status: "READY" };
    },
    setProcessing: (state) => {
      return { ...state, status: "PROCESSING" };
    },
    setEnableCollect: (state, action) => {
      return { ...state, enable_collect: action.payload };
    },
    dispense: (state, action) => {
      const status = action.payload.remainingMoneyToDispense > 0 ? "DISPENSING" : "ENDED";

      return {
        ...state,
        remainingMoneyToDispense: action.payload.remainingMoneyToDispense,
        quantity: action.payload.qty,
        status: status,
      };
    },
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    reset: (state) => {
      return { ...state, ...initialState };
    },
  },
});
export const { setPrize, setProcessing, setEnableCollect, reset, setStatus, dispense } =
  prizeSlice.actions;

export default prizeSlice.reducer;
