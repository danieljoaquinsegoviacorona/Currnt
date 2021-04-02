import { createSlice } from '@reduxjs/toolkit';

export const fnameSlice = createSlice({
    name: 'first_name',
    initialState: {
        value: ""
    },
    reducers: {
        CHANGE_FIRSTNAME: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = action.payload;
        }
    }
});

export const { CHANGE_FIRSTNAME } = fnameSlice.actions;

export default fnameSlice.reducer;