import React from "react";
import LoginForm from "components/login-form/login-form";
import ReactSVG from 'react-svg'
import { login } from 'actions'
import logo from 'assets/TitleLogo.svg'
import illust from 'assets/login_illust.svg'
import { Grid } from 'semantic-ui-react'

import "./Login.scss";

function Login() {

    function checkCredentials(username, password) {
        console.log(username, password);
        login();
    }

    return (
        <div className="Login">
            <Grid columns={2}>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <ReactSVG src={logo} svgClassName="title" />
                        <LoginForm checkCredentials={checkCredentials} className="form" />
                    </Grid.Column>
                    <Grid.Column>
                        <ReactSVG src={illust} svgClassName="illust" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );

}

export default Login;
