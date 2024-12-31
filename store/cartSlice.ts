import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type CartItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const initialState: CartItemType = { id: "", name: "", price: 0, image: "" };
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<number>) => {},
  },
});

export const { addTocart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart;
