import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./product-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { product: productSlice, cart: cartSlice },
});

export default store;
