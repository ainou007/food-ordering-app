import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
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
  quantity: number;
};

const initialState: {
  total: number;
  items: CartItemType[];
  activeItem: CartItemType | null;
} = {
  total: 0,
  items: [],
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
const isInCart = (item: CartItemType, cart: CartItemType[]) => {
  const newItem = { ...item };
  newItem.quantity = 1;
  newItem.totalPrice = 0;
  return cart.find((cartItem) => {
    const newCartItem = {
      ...cartItem,
    };
    newCartItem.quantity = 1;
    newCartItem.totalPrice = 0;
    return JSON.stringify(newItem) === JSON.stringify(newCartItem);
  });
};
const calculateCartPrice = (cart: CartItemType[]) => {
  const cartPrice = cart.reduce((acc, current) => {
    return acc + current.totalPrice;
  }, 0);

  return cartPrice;
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
    addActiveItemToCart: (state, action: PayloadAction<CartItemType>) => {
      const item = isInCart(action.payload, state.items);

      if (item) {
        state.items = state.items.map((cartItem) => {
          if (isInCart(action.payload, state.items)) {
            return {
              ...cartItem,
              quantity: (action.payload.quantity as number) + (cartItem.quantity || 1),
              totalPrice: action.payload.basePrice * ((action.payload.quantity as number) + (cartItem.quantity || 1)),
            };
          } else {
            return cartItem;
          }
        });
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateCartPrice(state.items);
    },
    clearActiveItem: (state) => {
      state.activeItem = null;
    },
    incrementQuantity: (state, action: PayloadAction<CartItemType>) => {
      const item = isInCart(action.payload, state.items);
      if (item) {
        state.items = state.items.map((cartItem) => {
          if (JSON.stringify(cartItem) === JSON.stringify(action.payload)) {
            cartItem = {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };

            return {
              ...cartItem,
              totalPrice: action.payload.basePrice * cartItem.quantity,
            };
          } else {
            return cartItem;
          }
        });
      }
      state.total = calculateCartPrice(state.items);
    },
    decrementQuantity: (state, action: PayloadAction<CartItemType>) => {
      const item = isInCart(action.payload, state.items);
      if (item) {
        state.items = state.items.map((cartItem) => {
          if (JSON.stringify(cartItem) === JSON.stringify(action.payload)) {
            cartItem = {
              ...cartItem,
              quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : cartItem.quantity,
            };

            return {
              ...cartItem,
              totalPrice: action.payload.basePrice * cartItem.quantity,
            };
          } else {
            return cartItem;
          }
        });
      }
      state.total = calculateCartPrice(state.items);
    },

    removeFromCart: (state, action: PayloadAction<CartItemType>) => {
      const item = isInCart(action.payload, state.items);
      if (item) {
        state.items = state.items.filter((filterItem) => {
          return JSON.stringify(item) !== JSON.stringify(filterItem);
        });
      }
      state.total = calculateCartPrice(state.items);
    },

    clearCart: (state) => {
      state.activeItem = null;
      state.items = [];
      state.total = 0;
    },
  },
});
export const {
  clearActiveItem,
  setActiveItem,
  setActiveSize,
  addToExtras,
  incrementQuantityActiveItem,
  decrementQuantityActiveItem,
  addActiveItemToCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const getTotalPrice = (state: RootState) => state.cart.total;
export const selectActiveItem = (state: RootState) => state.cart.activeItem;
