import { createSlice } from '@reduxjs/toolkit';

export const pwdSlice = createSlice({
    name: 'password',
    initialState: {
        value: ""
    },
    reducers: {
        CHANGE_PASSWORD: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = action.payload;
        }
    }
});

export const { CHANGE_PASSWORD } = pwdSlice.actions;

export default pwdSlice.reducer;