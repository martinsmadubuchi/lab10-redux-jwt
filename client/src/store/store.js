// store.js - demonstrates STORE and SUBSCRIBE
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";

// 1 - STORE: one object that holds the whole app state
export const store = configureStore({
  reducer: {
    counter: counterReducer, // state.counter
    auth: authReducer,       // state.auth
  },
});

// 5 - SUBSCRIBE: this runs EVERY time the state changes
store.subscribe(() => {
  const state = store.getState();
  console.log("[Redux subscribe] State changed:", state);

  // Save or remove the JWT whenever auth state changes
  if (state.auth.token) {
    localStorage.setItem("token", state.auth.token);
    localStorage.setItem("user", JSON.stringify(state.auth.user));
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
});