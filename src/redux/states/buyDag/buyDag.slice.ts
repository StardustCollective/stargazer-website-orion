/////////////////////////////
// ANCHOR Action Imports
/////////////////////////////

import buyDagActions from './buyDag.actions';

/////////////////////////////
// ANCHOR Interfaces
/////////////////////////////

import { createSlice } from "@reduxjs/toolkit";

/////////////////////////////
// ANCHOR Interfaces
/////////////////////////////
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

/////////////////////////////
// ANCHOR Initial State
/////////////////////////////

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

/////////////////////////////
// ANCHOR Constants
/////////////////////////////

const BUY_DAG_SLICE_NAME = 'buyDag'

/////////////////////////////
// ANCHOR Slice Config
/////////////////////////////

const buyDagSlice = createSlice({
  name: BUY_DAG_SLICE_NAME,
  initialState,
  reducers: {
    setPaymentInfo: buyDagActions.setPaymentInfo,
  },
});

export const actions = buyDagSlice.actions;
export const reducer = buyDagSlice.reducer;