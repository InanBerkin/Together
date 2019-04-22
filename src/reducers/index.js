import { combineReducers } from "redux";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : {};

function login(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { isLoggedIn: true };
        case 'SIGN_OUT':
            return { isLoggedIn: false };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    login
});

export default rootReducer;