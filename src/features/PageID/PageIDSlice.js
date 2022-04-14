import { createSlice } from "@reduxjs/toolkit";

export const PageIDSlice = createSlice({
	name: "PageID",
	initialState: {
		id: 0,
	},
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.id += 1;
		},
		set: (state, action) => {
			state.id = action.payload;
		},
		decrement: (state) => {
			state.id -= 1;
		},
		incrementByAmount: (state, action) => {
			state.id += action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, set, decrement, incrementByAmount } =
	PageIDSlice.actions;

export default PageIDSlice.reducer;
