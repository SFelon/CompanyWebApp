import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  notification,
} from 'antd';
import { getHeadsNames } from '../../store/actions/user_action';
import { checkUsernameAvailability } from '../../store/actions/auth_action';

const FormItem = Form.Item;
const Option = Select.Option;

const AddEmployeeModal = Form.create()(class extends Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateUsernameAvailability = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value === form.getFieldValue('username')) {
        checkUsernameAvailability(value).then((response) => {
          if (response.available) {
            callback();
          } else {
            callback('Username is already taken');
          }
        }).catch(() => {

        });
    }
  };

  render() {
    const {
      visible,
      onCancel,
      onCreate,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal
        visible={visible}
        title="Add New Employee"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal">
          <FormItem
            {...formItemLayout}
            label="First Name"
          >
            {getFieldDecorator('firstName', {
              rules: [{
                required: true, message: 'Please input employee first name!'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Last Name"
          >
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input employees last name!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Username"
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input employee username!'
              }, {
                validator: this.validateUsernameAvailability,
              }],
            })(
              <Input onBlur={this.handleConfirmBlur}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Minimum Salary"
          >
            {getFieldDecorator('minSalary', {
              initialValue: 0,
            })(
              <InputNumber min={0} max={1000000} step={100} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Maximum Salary"
          >
            {getFieldDecorator('maxSalary', {
              initialValue: 0,
            })(
              <InputNumber min={0} max={1000000} step={1000} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

const mapStateToProps = state => ({
  heads: state.user.headsName,
});

export default connect(mapStateToProps, { getHeadsNames, checkUsernameAvailability })(AddEmployeeModal);
