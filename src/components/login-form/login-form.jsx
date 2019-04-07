import React, { Component } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import "./login-form.scss";

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <div className="button-area">
          <Link to="/welcome">
            <Button color="green" onClick={() => this.props.checkCredentials(this.state.username)} type='submit'>Submit</Button>
          </Link>
        </div>
      </Form>
    );
  }
}
export default LoginForm;
