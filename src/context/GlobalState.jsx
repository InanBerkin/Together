import React, { useReducer } from 'react';
import AppContext from './app-context';

const GlobalState = props => {
    const userData = {};
    let reducer = (state, action) => {
        switch (action.type) {
            case "SET_USER_DATA":
                return { userData: action.data };
            case "GET_USER_DATA":
                return state;
            default:
                return;
        }
    };
    const [state, dispatch] = useReducer(reducer, userData);

    return (
        <AppContext.Provider value={
            {
                state, dispatch
            }
        }>
            {props.children}
        </AppContext.Provider>
    );
};

export default GlobalState;