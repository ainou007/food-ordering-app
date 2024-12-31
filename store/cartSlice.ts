import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type CartItemType = {
  value: number;
};
const initialState: CartItemType = { value: 0 };
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { addTocart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart;
