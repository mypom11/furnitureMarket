import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import productSlice from "./product-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const rootReducer = combineReducers({
  product: productSlice,
  cart: cartSlice,
  ui: uiSlice,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: (state, action) => {
      switch (action.type) {
        case HYDRATE:
          return action.payload;
        default:
          return rootReducer(state, action);
      }
    },
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof rootReducer>;
export default wrapper;
