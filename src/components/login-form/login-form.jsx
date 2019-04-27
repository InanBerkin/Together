import React, { useState } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import "./login-form.scss";

function LoginForm({ checkCredentials }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form>
      <Form.Field>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <div className="button-area">
        <Link to="/">
          <Button color="green" onClick={() => checkCredentials(username, password)} type='submit'>Submit</Button>
        </Link>
      </div>
    </Form>
  );

}
export default LoginForm;
