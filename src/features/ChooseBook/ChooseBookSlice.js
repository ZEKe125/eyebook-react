import { createSlice } from "@reduxjs/toolkit";

export const ChooseBookSlice = createSlice({
	name: "ChooseBook",
	initialState: {
		value : 0 ,
	},
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		set: (state, action) => {
			state.value = action.payload;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, set, decrement, incrementByAmount } =
	ChooseBookSlice.actions;

export default ChooseBookSlice.reducer;
