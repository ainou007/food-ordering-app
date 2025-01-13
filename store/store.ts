import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cartSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persisteConfig = {
  key: "root",
  storage,
  whiteList: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persisteConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER],
      },
    });
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
