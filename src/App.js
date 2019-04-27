import React, { useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import TopBar from "components/top-bar/top-bar";
import SideBar from "components/side-bar/side-bar";
import Login from 'routes/Login/Login.jsx';
import Welcome from 'routes/Welcome/Welcome.jsx';
import CreateGroupForm from 'routes/CreateGroupForm/CreateGroupForm.jsx';
import Profile from 'routes/Profile/Profile.jsx';
import EventDetails from 'routes/EventDetails/EventDetails.jsx';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    function redirectToLogin() {
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }
    }

    return (
        <BrowserRouter>
            <Route path="/login" component={Login} />
            {redirectToLogin()}
            <TopBar />
            <Grid>
                <Grid.Column stretched width='3'>
                    <SideBar />
                </Grid.Column>
                <Grid.Column stretched width='13'>
                    <Route path="/" component={Welcome} exact />
                    <Route path="/create-group" exact component={CreateGroupForm} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/event-details/:id" exact component={EventDetails} />
                </Grid.Column>
            </Grid>
        </BrowserRouter>
    );

}

export default App;
