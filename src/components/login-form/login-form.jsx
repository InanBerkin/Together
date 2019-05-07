import React, { useState, useContext } from "react";
import api from 'api.js';
import { AppContext } from 'AppContext.js'
import { Button, Form } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import "./login-form.scss";
import { useForm } from "hooks/useForm";

function LoginForm({ history }) {
  const [context, setContext] = useContext(AppContext);
  const [registerView, setRegisterView] = useState(false);

  const { values, handleChange, handleSubmit, errors, isSubmitting } = useForm(validate, login, registerView, signUp);

  async function signUp() {
    console.log(values);
    const res = await api.signUp(values);
  }

  function login() {
    console.log("Login");

    // const res = await api.login(values);
    // api.login(values).then((res) => {
    //   const token = res.data.token;
    //   // setContext(context => ({ ...context, userData: data }));
    //   api.setAuthToken(token);
    //   setContext({ ...context, login: true });
    //   localStorage.setItem('loggedIn', true);
    //   history.push("/");
    // }).catch((err) => console.log("Login Failed"));
    setContext({ ...context, loggedIn: true });
    localStorage.setItem('loggedIn', true);
    history.push("/");
  }

  //Validation Rules
  function validate(values) {
    let errors = {};
    if (registerView) {
      if (!values.email) {
        errors.email = 'Email address is required';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
      }
      else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };


  return (
    <div>
      <Button.Group>
        <Button color="orange" onClick={() => setRegisterView(false)}>Login</Button>
        <Button.Or />
        <Button color="red" onClick={() => setRegisterView(true)}>Sign Up</Button>
      </Button.Group>
      <Form>
        {registerView ? <h1>Sign Up</h1> : <h1>Login</h1>}
        {registerView ?
          <Form.Field error={errors.email && errors.email.length !== 0}>
            <label>Email</label>
            <input name='email' value={values.email || ''} onChange={handleChange} placeholder='Email' />
            {errors.email && (<p className="error">{errors.email}</p>)}
          </Form.Field> : ''}
        <Form.Field error={errors.username && errors.username.length !== 0}>
          <label>Username</label>
          <input name='username' value={values.username || ''} onChange={handleChange} placeholder='First Name' />
          {errors.username && (<p className="error">{errors.username}</p>)}
        </Form.Field>
        <Form.Field error={errors.password && errors.password.length !== 0}>
          <label>Password</label>
          <input name='password' value={values.password || ''} onChange={handleChange} placeholder='Password' />
          {errors.password && (<p className="error">{errors.password}</p>)}
        </Form.Field>
        {registerView ?
          <Form.Field error={errors.confirmPassword && errors.confirmPassword.length !== 0}>
            <label>Confirm Password</label>
            <input name='confirmPassword' value={values.confirmpPassword || ''} onChange={handleChange} placeholder='Confirm Password' />
            {errors.confirmPassword && (<p className="error">{errors.confirmPassword}</p>)}
          </Form.Field> : ''}
        <div className="button-area">
          <Form.Button color="green" loading={isSubmitting} onClick={handleSubmit}>Submit</Form.Button>
        </div>
        <div className="error-area">
        </div>
      </Form>
    </div>
  );

}
export default withRouter(LoginForm);



