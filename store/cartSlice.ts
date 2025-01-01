import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductExtra, ProductSize } from "@/components/menu/types";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: {
    activeSize: string;
    sizesList: ProductSize[];
  };
  extras?: {
    activeExtra: string[];
    extrasList: ProductExtra[];
  };
  quantity?: number;
};

const initialState: {
  items: CartItemType[];
  activeItem: CartItemType | null;
} = {
  items: [] as CartItemType[],
  activeItem: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<CartItemType | null>) => {
      state.activeItem = action.payload;
    },
    setActiveSize: (state, action: PayloadAction<string>) => {
      state.activeItem!.sizes!.activeSize = action.payload;
    },
    addToExtras: (state, action: PayloadAction<string>) => {
      // check if the extra is already in the list
      if (state.activeItem!.extras!.activeExtra.includes(action.payload)) {
        state.activeItem!.extras!.activeExtra = state.activeItem!.extras!.activeExtra.filter(
          (extra) => extra !== action.payload,
        );
        return;
      }

      state.activeItem!.extras!.activeExtra.push(action.payload);
    },
    addTocart: (state, action: PayloadAction<number>) => {},
  },
});

export const { addTocart, setActiveItem, setActiveSize, addToExtras } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectActiveItem = (state: RootState) => state.cart.activeItem;
