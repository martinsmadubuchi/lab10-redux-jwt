// authSlice.js - stores the JWT token in Redux STATE
import { createSlice } from "@reduxjs/toolkit";

// Load a saved token so the user stays logged in after a page refresh
const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

// 0 - STATE
const initialState = {
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // 2 - REDUCERS
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token; // JWT from the server
      state.user = action.payload.user;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
});

// 3 - ACTIONS
//   loginSuccess({ token, user }) -> { type: "auth/loginSuccess", payload: {...} }
//   logout()                      -> { type: "auth/logout" }
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;