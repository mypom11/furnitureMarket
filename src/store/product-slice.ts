import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice.reducer;
