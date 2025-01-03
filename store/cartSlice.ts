import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { stat } from "fs";
import { ProductExtra, ProductSize } from "@/components/menu/types";

export type CartItemType = {
  id: string;
  name: string;
  basePrice: number; // Use basePrice to store the original price without extras and sizes
  totalPrice: number;
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
  total: number;
  items: CartItemType[];
  activeItem: CartItemType | null;
} = {
  total: 0,
  items: [] as CartItemType[],
  activeItem: null,
};

const calculateTotalPrice = (item: CartItemType): number => {
  const sizePrice = item.sizes?.sizesList.find((size) => size.id === item.sizes!.activeSize)?.price ?? 0;

  const extraPrice =
    item.extras?.activeExtra.reduce((acc, extra) => {
      const price = item.extras!.extrasList.find((ext) => ext.id === extra)?.price;
      return price ? acc + price : acc;
    }, 0) ?? 0;

  return ((sizePrice ? 0 : item.basePrice) + sizePrice + extraPrice) * item.quantity!;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Handle the active item
    setActiveItem: (state, action: PayloadAction<CartItemType | null>) => {
      state.activeItem = action.payload;
      if (state.activeItem && (state.activeItem.sizes || state.activeItem.extras)) {
        state.activeItem.totalPrice = calculateTotalPrice(state.activeItem);
      }
    },
    setActiveSize: (state, action: PayloadAction<string>) => {
      if (state.activeItem && state.activeItem.sizes) {
        state.activeItem.sizes.activeSize = action.payload;
        state.activeItem.totalPrice = calculateTotalPrice(state.activeItem);
      }
    },
    addToExtras: (state, action: PayloadAction<string>) => {
      if (state.activeItem && state.activeItem.extras) {
        const activeExtras = state.activeItem.extras.activeExtra;
        if (activeExtras.includes(action.payload)) {
          state.activeItem.extras.activeExtra = activeExtras.filter((extra) => extra !== action.payload);
        } else {
          state.activeItem.extras.activeExtra.push(action.payload);
        }
        state.activeItem.totalPrice = calculateTotalPrice(state.activeItem);
      }
    },
    addTocart: (state, action: PayloadAction<CartItemType>) => {
      const item = action.payload;
      item.totalPrice = calculateTotalPrice(item);
      state.items.push(item);
    },
    incrementQuantityActiveItem: (state) => {
      state.activeItem!.quantity = state.activeItem!.quantity! + 1;
      state.activeItem!.totalPrice = calculateTotalPrice(state.activeItem!);
    },
    decrementQuantityActiveItem: (state) => {
      if (state.activeItem!.quantity! > 1) {
        state.activeItem!.quantity = state.activeItem!.quantity! - 1;
        state.activeItem!.totalPrice = calculateTotalPrice(state.activeItem!);
      }
    },
    // Handle the cart items
    addAcriveItemToCart: (state) => {
      {
        let itemsInCart: CartItemType[] | undefined;
        // Check if there is an active item
        if (state.activeItem) {
          // Check if the item is already in the cart
          itemsInCart = state.items.filter((item) => item.id === state.activeItem!.id);
          if (itemsInCart && itemsInCart.length > 0) {
            // check if the item has the same size and extras
            if (
              itemsInCart.find((item) => JSON.stringify(item.sizes?.activeSize) === JSON.stringify(state.activeItem?.sizes?.activeSize)) &&
              itemsInCart.find((item) => JSON.stringify(item.extras?.activeExtra) === JSON.stringify(state.activeItem?.extras?.activeExtra))
            ) {
            } else {
              state.items.push(state.activeItem);
            }
          } else {
            state.items.push(state.activeItem);
          }
        }
      }
    },
    clearActiveItem: (state) => {
      state.activeItem = null;
    },
  },
});

export const { addTocart, clearActiveItem, setActiveItem, setActiveSize, addToExtras, incrementQuantityActiveItem, decrementQuantityActiveItem, addAcriveItemToCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectActiveItem = (state: RootState) => state.cart.activeItem;
