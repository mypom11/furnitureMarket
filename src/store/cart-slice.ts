import { CartItem } from "./../models/index";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  isCartShow: false,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartShow = !state.isCartShow;
    },
    addItemToCart(state, action) {
      const newItem: CartItem = action.payload;
      const existingItem: CartItem | undefined = state.items.find(
        (item: CartItem) => item.productId === newItem.productId,
      );
      state.totalQuantity += newItem.quantity;
      if (!existingItem || existingItem === undefined) {
        state.items.push({
          productId: newItem.productId,
          productName: newItem.productName,
          quantity: newItem.quantity,
          productCompany: newItem.productCompany,
          productPrice: newItem.productPrice,
          img: newItem.img,
        });
      } else {
        existingItem.quantity += newItem.quantity;
      }
      state.totalPrice += newItem.quantity * newItem.productPrice;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.productId !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalPrice = state.totalPrice - existingItem!.productPrice;
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
