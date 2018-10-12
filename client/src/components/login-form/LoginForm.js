import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import { signInAction, getCurrentUser } from '../../store/actions/auth_action';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn(data) {
    this.props.signInAction(data);
    this.props.history.push("/");
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        this.signIn(loginRequest);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('usernameOrEmail', {
            rules: [{ required: true, message: 'Please input your username or email!' }],
          })(
            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="usernameOrEmail"
              placeholder="Username or Email"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              name="password"
              type="password"
              placeholder="Password"
            />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(connect(mapStateToProps, { signInAction, getCurrentUser })(LoginForm));
