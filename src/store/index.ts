import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./product-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { product: productSlice, cart: cartSlice, ui: uiSlice },
});

export default store;
