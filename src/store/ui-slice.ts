import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiSliceModel {
  isLoading: boolean;
  isLogin: boolean;
  recentItems: string[];
}

const initialState: uiSliceModel = {
  isLoading: false,
  isLogin: false,
  recentItems: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },

    setRecentView(state, action: PayloadAction<string>) {
      //action.payload로 아이디를 받아오고
      //만약 이미 존재하는 애면 지우고(필터로 지우고)

      const newItems: Array<string> = state.recentItems.filter(
        (item) => item !== action.payload,
      );
      //배열에 추가
      newItems.push(action.payload);
      //최대 6개니까 7이면 뒤에놈 지우기
      if (newItems.length === 7) {
        newItems.pop();
      }

      state.recentItems = newItems;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
