import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { bindActionCreators } from "redux";

const updateFirstName = (firstName) => ({ type: "CHANGE_FIRSTNAME", payload: firstName });
const updateLastName = (lastName) => ({ type: "CHANGE_LASTNAME", payload: lastName });
const updatePassword = (pass) => ({ type: "CHANGE_PASSWORD", payload: pass });
const updateBday = (bday) => ({ type: "CHANGE_BDAY", payload: bday });
const updateGender = (gender) => ({ type: "CHANGE_GENDER", payload: gender });

const addUserReducer = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_FIRSTNAME":

            state = { ...state, f_name: action.payload }
            break;

        case "CHANGE_LASTNAME":
            state = { ...state, l_name: action.payload }
            break;

        case "CHANGE_PASSWORD":
            state = { ...state, pwd: action.payload }
            break;

        case "CHANGE_BDAY":
            state = { ...state, b_date: action.payload }
            break;

        case "CHANGE_GENDER":
            state = { ...state, gender: action.payload }
            break;

        default:
            break;
    }
    return state;
}

const reducers = combineReducers({
    addUser: addUserReducer
})

const store = configureStore({
    reducer: reducers
});
const actionCreators = bindActionCreators(
    {
        updateFirstName,
        updateLastName,
        updatePassword,
        updateBday,
        updateGender
    },
    store.dispatch
);


export { actionCreators, store };

