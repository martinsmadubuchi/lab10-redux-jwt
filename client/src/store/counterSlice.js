// counterSlice.js - demonstrates STATE, REDUCER and ACTION
import { createSlice } from "@reduxjs/toolkit";

// 0 - STATE: the starting data for the counter
const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  // 2 - REDUCER: (current state + action) -> new state
  // (Redux Toolkit uses Immer, so "state.value += 1" safely creates a NEW state)
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// 3 - ACTION: createSlice makes "action creators" for us
//   increment()            -> { type: "counter/increment" }
//   incrementByAmount(5)   -> { type: "counter/incrementByAmount", payload: 5 }
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;