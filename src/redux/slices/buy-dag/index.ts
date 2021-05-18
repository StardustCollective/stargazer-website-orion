import { createSlice } from "@reduxjs/toolkit";

interface IBuyDag {
  usdValue: number;
  dagValue: number;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  email: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
}

const initialState: IBuyDag = {
  usdValue: 0,
  dagValue: 0,
  cardNumber: "",
  cardName: "",
  expiryDate: "",
  cvv: "",
  email: "",
  country: "",
  address: "",
  city: "",
  postalCode: "",
};

const buyDagSlice = createSlice({
  name: "buy-dag",
  initialState,
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setState } = buyDagSlice.actions;

export default buyDagSlice.reducer;
