import React, { useState, useContext, useEffect } from "react";
import GlobalState from 'context/GlobalState.jsx';
import AppContext from 'context/app-context';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import TopBar from "components/top-bar/top-bar";
import api from 'api.js';
// import SideBar from "components/side-bar/side-bar";
import Login from 'routes/Login/Login.jsx';
import Welcome from 'routes/Welcome/Welcome.jsx';
import CreateGroupForm from 'routes/CreateGroupForm/CreateGroupForm.jsx';
import CreateEventForm from 'routes/CreateEventForm/CreateEventForm.jsx';
import Profile from 'routes/Profile/Profile.jsx';
import EditProfile from 'routes/Profile/EditProfile/EditProfile.jsx';
import EventDetails from 'routes/EventDetails/EventDetails.jsx';
import GroupDetails from 'routes/GroupDetails/GroupDetails.jsx';


function App() {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.getProfileData().then((res) => {
                dispatch({ type: "SET_USER_DATA", data: res.data });
            }).catch((err) => console.error(err));
        }
    }, [])

    const protectedRoutes = function () {
        let loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            return <Redirect to="/login" />;
        }
        return (
            <>
                <TopBar />
                <Route path="/" exact component={Welcome} />
                <Route path="/create-group" exact component={CreateGroupForm} />
                <Route path="/create-event" exact component={CreateEventForm} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/profile/edit-profile" exact component={EditProfile} />
                <Route path="/event-details/:id" exact component={EventDetails} />
                <Route path="/group-details/:id" exact component={GroupDetails} />
            </>
        );
    }

    return (
        <GlobalState>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    {protectedRoutes()}
                </Switch>
            </BrowserRouter>
        </GlobalState>
    );

}

export default App;
