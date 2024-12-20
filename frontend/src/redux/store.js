import { configureStore, createSlice } from "@reduxjs/toolkit";
import examCategoryReducer from "./examCategorySlice";
import examReducer from "./examSlice";
import classReducer from "./classSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    examCategory: examCategoryReducer,
    exam: examReducer,
    class: classReducer,
  },
});

export default store;
