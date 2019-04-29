import React, { useState, useContext } from "react";
import api from 'api.js';
import { AppContext } from 'AppContext.js'
import { Button, Form } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import "./login-form.scss";

function LoginForm({ history }) {
  const [context, setContext] = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [email, setEmail] = useState('');
  const [registerView, setRegisterView] = useState(false);
  const [isLoading, setIsLoading] = useState();


  function showPasswordConfirmation() {
    if (registerView) {
      return (
        <Form.Field>
          <label>Confirm Password</label>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
        </Form.Field>
      );
    }
  }

  function showEmail() {
    if (registerView) {
      return (
        <Form.Field>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        </Form.Field>
      );
    }
  }

  function handleSubmit() {
    setIsLoading(true);
    if (registerView) {
      signUp();
    }
    else {
      login();
    }
    setIsLoading(false);
  }

  function validateForm() {
    if (!email || !username || !password || !confirmPassword) {
      setErrorText("Please fill all the fields");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorText("Passwords do not match");
      return false;
    }
  }

  function signUp() {
    // if (!validateForm()) {
    //   return;
    // }
    const userData = {
      username,
      password,
      email
    };
    api.signUp(userData);
  }

  function login() {
    const userData = {
      username,
      password,
    };
    api.login(userData).then((res) => {
      const token = res.data.token;
      //setContext(context => ({ ...context, userData: data }));
      api.setAuthToken(token);
      history.push("/");
    }).catch((err) => setErrorText("Login Failed"));
  }



  return (
    <div>
      <Button.Group>
        <Button color="orange" onClick={() => setRegisterView(false)}>Login</Button>
        <Button.Or />
        <Button color="red" onClick={() => setRegisterView(true)}>Sign Up</Button>
      </Button.Group>
      <Form>
        {showEmail()}
        <Form.Field>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </Form.Field>
        {showPasswordConfirmation()}
        <div className="button-area">
          <Button color="green" loading={isLoading} onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="error-area">
          <h2 className="error">
            {errorText}
          </h2>
        </div>
      </Form>
    </div>
  );

}
export default withRouter(LoginForm);
