import React from 'react';
import AppContext from './app-context';

const GlobalState = props => {
    const filterDate = new Date();

    return (
        <AppContext.Provider value={
            {
                filterDate: filterDate,
            }
        }>
            {props.children}
        </AppContext.Provider>
    );
};

export default GlobalState;