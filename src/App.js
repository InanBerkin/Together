import React, { useState, useContext } from "react";
import GlobalState from 'context/GlobalState.jsx';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import TopBar from "components/top-bar/top-bar";
import SideBar from "components/side-bar/side-bar";
import Login from 'routes/Login/Login.jsx';
import Welcome from 'routes/Welcome/Welcome.jsx';
import CreateGroupForm from 'routes/CreateGroupForm/CreateGroupForm.jsx';
import Profile from 'routes/Profile/Profile.jsx';
import EditProfile from 'routes/Profile/EditProfile/EditProfile.jsx';
import EventDetails from 'routes/EventDetails/EventDetails.jsx';
import GroupDetails from 'routes/GroupDetails/GroupDetails.jsx';


function App(props) {
    const protectedRoutes = function () {
        let loggedIn = localStorage.getItem('loggedIn');
        let token = localStorage.getItem('token');
        if (!loggedIn) {
            return <Redirect to="/login" />;
        }
        return (
            <>
                <TopBar />
                <Grid>
                    <Grid.Column stretched width='3'>
                        <SideBar />
                    </Grid.Column>
                    <Grid.Column stretched width='13'>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/create-group" exact component={CreateGroupForm} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/profile/edit-profile" exact component={EditProfile} />
                        <Route path="/event-details/:id" exact component={EventDetails} />
                        <Route path="/group-details/:id" exact component={GroupDetails} />
                    </Grid.Column>
                </Grid>
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
