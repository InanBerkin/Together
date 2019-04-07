import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from 'routes/Login/Login.jsx';
import Welcome from 'routes/Welcome/Welcome.jsx';
import CreateGroupForm from 'routes/CreateGroupForm/CreateGroupForm.jsx';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/welcome" component={Welcome} />
                    <Route path="/create-group" component={CreateGroupForm} />
                    <Route path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
