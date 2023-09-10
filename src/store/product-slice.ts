import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/models";

// const DUMMY_FURNITURE = [
//   new Product(
//     "센트로까사1",
//     "로이 큐브 사이드테이블",
//     128000,
//     "로이 시리즈 테이블은 철제 특유의 개성을 센트로 까사만의 감각으로 만들어 낸 테이블입니다.",
//     1,
//     [
//       "https://indebox.co.kr/web/product/small//cha/uam001ssum.jpg",
//       "https://indebox.co.kr/web/product/extra/small/202308/327fe681c451aa0a800fed3a6f48cf34.jpg",
//       "https://indebox.co.kr/web/product/extra/big/202103/46aabf2b7259757e050a15cfbb5ecc6e.jpg",
//     ],
//   ),
//   new Product(
//     "센트로까사2",
//     "로이 큐브 사이드테이블",
//     128000,
//     "로이 시리즈 테이블은 철제 특유의 개성을 센트로 까사만의 감각으로 만들어 낸 테이블입니다.",
//     1,
//     [
//       "https://indebox.co.kr/web/product/small//cha/uam001ssum.jpg",
//       "https://indebox.co.kr/web/product/extra/small/202308/327fe681c451aa0a800fed3a6f48cf34.jpg",
//       "https://indebox.co.kr/web/product/extra/big/202103/46aabf2b7259757e050a15cfbb5ecc6e.jpg",
//     ],
//   ),
//   new Product(
//     "센트로까사3",
//     "로이 큐브 사이드테이블",
//     128000,
//     "로이 시리즈 테이블은 철제 특유의 개성을 센트로 까사만의 감각으로 만들어 낸 테이블입니다.",
//     1,
//     [
//       "https://indebox.co.kr/web/product/small//cha/uam001ssum.jpg",
//       "https://indebox.co.kr/web/product/extra/small/202308/327fe681c451aa0a800fed3a6f48cf34.jpg",
//       "https://indebox.co.kr/web/product/extra/big/202103/46aabf2b7259757e050a15cfbb5ecc6e.jpg",
//     ],
//   ),
// ];

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
