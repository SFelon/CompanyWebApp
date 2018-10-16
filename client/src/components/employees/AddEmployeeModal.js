import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Radio,
  DatePicker,
} from 'antd';
import { checkUsernameAvailability, checkEmailAvailability } from '../../store/actions/auth_action';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 20;
const EMAIL_MAX_LENGTH = 40;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 15;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 25;
const MIN_SALARY = 0;
const MAX_SALARY = 1000000;

class AddEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        value: '',
      },
      lastName: {
        value: '',
      },
      username: {
        value: '',
      },
      email: {
        value: '',
      },
      password: {
        value: '',
      },
      privatePhone: {
        value: '',
      },
      businessPhone: {
        value: '',
      },
      salary: {
        value: '',
      },
      dateOfEmployment: {
        value: '',
      },
      role: {
        value: '',
      },
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDataInput = this.handleDataInput.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  handleInputChange(event, validationFunction) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFunction(inputValue),
      },
    });
  }

  handleDataInput(event, validationFunction) {
    console.log(event);
    const target = event.target;
    const inputValue = target.value;

    this.setState({
      dateOfEmployment: {
        value: inputValue,
        ...validationFunction(inputValue),
      },
    });
  }

  handleOk() {
    const employeeRequest = {
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      username: this.state.username.value,
      email: this.state.email.value,
      password: this.state.password.value,
      privatePhone: this.state.privatePhone.value,
      businessPhone: this.state.businessPhone.value,
      salary: this.state.salary.value,
      dateOfEmployment: this.state.dateOfEmployment.value,
      role: this.state.role.value,
    };
    this.props.onCreate(employeeRequest);
  }

  isFormInvalid() {
    return !(this.state.firstName.validateStatus === 'success' &&
      this.state.lastName.validateStatus === 'success' &&
      this.state.username.validateStatus === 'success' &&
      this.state.email.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success' &&
      this.state.privatePhone.validateStatus === 'success' &&
      this.state.businessPhone.validateStatus === 'success' &&
      this.state.salary.validateStatus === 'success' &&
      this.state.dateOfEmployment.validateStatus === 'success'
    );
  }

  render() {
    const {
      visibleModal,
      onCancel,
    } = this.props;
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
        visible={visibleModal}
        title="Add New Employee"
        okText="Create"
        onCancel={onCancel}
        onOk={this.handleOk}
        okButtonProps={{ disabled: this.isFormInvalid() }}
      >
        <Form layout="horizontal">
          <FormItem
            {...formItemLayout}
            label="First Name"
            validateStatus={this.state.firstName.validateStatus}
            help={this.state.firstName.errorMsg}
          >
            <Input
              name="firstName"
              autoComplete="off"
              placeholder="First name"
              value={this.state.firstName.value}
              onChange={event => this.handleInputChange(event, this.validateName)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Last Name"
            validateStatus={this.state.lastName.validateStatus}
            help={this.state.lastName.errorMsg}
          >
            <Input
              name="lastName"
              autoComplete="off"
              placeholder="Last name"
              value={this.state.lastName.value}
              onChange={event => this.handleInputChange(event, this.validateName)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Username"
            hasFeedback
            validateStatus={this.state.username.validateStatus}
            help={this.state.username.errorMsg}
          >
            <Input
              name="username"
              autoComplete="off"
              placeholder="Username"
              value={this.state.username.value}
              onBlur={this.validateUsernameAvailability}
              onChange={event => this.handleInputChange(event, this.validateUsername)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Email"
            hasFeedback
            validateStatus={this.state.email.validateStatus}
            help={this.state.email.errorMsg}
          >
            <Input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Email"
              value={this.state.email.value}
              onBlur={this.validateEmailAvailability}
              onChange={event => this.handleInputChange(event, this.validateEmail)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
            validateStatus={this.state.password.validateStatus}
            help={this.state.password.errorMsg}>
            <Input
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password 5 - 25 characters"
              value={this.state.password.value}
              onChange={event => this.handleInputChange(event, this.validatePassword)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Private Phone"
            validateStatus={this.state.privatePhone.validateStatus}
            help={this.state.privatePhone.errorMsg}
          >
            <Input
              name="privatePhone"
              type="tel"
              autoComplete="off"
              placeholder="Private Phone"
              value={this.state.privatePhone.value}
              onChange={event => this.handleInputChange(event, this.validatePhone)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Business Phone"
            validateStatus={this.state.businessPhone.validateStatus}
            help={this.state.businessPhone.errorMsg}
          >
            <Input
              name="businessPhone"
              type="tel"
              autoComplete="off"
              placeholder="Business Phone"
              value={this.state.businessPhone.value}
              onChange={event => this.handleInputChange(event, this.validatePhone)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Salary"
            validateStatus={this.state.salary.validateStatus}
            help={this.state.salary.errorMsg}
          >
            <Input
              name="salary"
              type="number"
              autoComplete="off"
              placeholder="Salary"
              min={0}
              max={1000000}
              step={100}
              value={this.state.salary.value}
              onChange={event => this.handleInputChange(event, this.validateSalary)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Date of Employment"
            validateStatus={this.state.dateOfEmployment.validateStatus}
            help={this.state.dateOfEmployment.errorMsg}
          >
            <Input
              name="dateOfEmployment"
              type="date"
              value={this.state.dateOfEmployment.value}
              onChange={event => this.handleDataInput(event, this.validateDate)}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Role"
          >
            <RadioGroup
              name="radiogroup"
              defaultValue="ROLE_EMPLOYEE"
              value={this.state.role.value}
              onChange={event => this.handleInputChange(event, this.validateRole)}
            >
              <Radio value="ROLE_EMPLOYEE">Employee</Radio>
              <Radio value="ROLE_HEAD">Head</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Modal>
    );
  }

  validateName = (name) => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Minimum ${NAME_MIN_LENGTH} characters needed.`,
      }
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Maximum ${NAME_MAX_LENGTH} characters allowed.`,
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  };

  validateEmail = (email) => {
    if (!email) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email may not be empty',
      };
    }

    const EMAIL_REGEX = RegExp(`^[^@]+@[^@]+\\.[^@]+$`);
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email not valid',
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Maximum ${EMAIL_MAX_LENGTH} characters allowed`,
      };
    }

    return {
      validateStatus: null,
      errorMsg: null,
    };
  }

  validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Minimum ${USERNAME_MIN_LENGTH} characters needed.`,
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Maximum ${USERNAME_MAX_LENGTH} characters allowed.`,
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null,
      };
    }
  }

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Minimum ${PASSWORD_MIN_LENGTH} characters needed.`,
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Maximum ${PASSWORD_MAX_LENGTH} characters allowed.`,
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validatePhone = (phoneNumber) => {
    if (!phoneNumber) {
      return {
        validateStatus: 'error',
        errorMsg: 'Phone number may not be empty',
      };
    }

    const PHONE_REGEX = RegExp(`^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,3})|(\\(?\\d{2,3}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$`);
    if(!PHONE_REGEX.test(phoneNumber)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Phone number not valid',
      };
    }

    return {
      validateStatus: null,
      errorMsg: null
    }
  };

  validateSalary = (salary) => {
    if (salary < MIN_SALARY) {
      return {
        validateStatus: 'error',
        errorMsg: `Minimum salary in this department is ${MIN_SALARY}.`,
      };
    } else if (salary > MAX_SALARY) {
      return {
        validationStatus: 'error',
        errorMsg: `Maximum salary in this department is ${MAX_SALARY}.`,
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  };

  validateDate = (date) => {
    console.log(date);
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  };

  validateRole = (role) => {
    console.log(role);
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  };

  validateUsernameAvailability = () => {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if(usernameValidation.validateStatus === 'error') {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation,
        },
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: 'validating',
        errorMsg: null,
      },
    });

    checkUsernameAvailability(usernameValue)
      .then((response) => {
        if(response.available) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'success',
              errorMsg: null,
            },
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'error',
              errorMsg: 'This username is already taken',
            }
          });
        }
      }).catch((error) => {
      // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: 'success',
            errorMsg: null,
          },
        });
      });
  }

  validateEmailAvailability = () => {
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation,
        },
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: 'validating',
        errorMsg: null,
      },
    });

    checkEmailAvailability(emailValue)
      .then((response) => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'success',
              errorMsg: null,
            },
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'error',
              errorMsg: 'This Email is already registered'
            },
          });
        }
      }).catch((error) => {
      // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          email: {
            value: emailValue,
            validateStatus: 'success',
            errorMsg: null,
          },
        });
      });
  };
}

const mapStateToProps = state => ({
  heads: state.user.headsName,
});

export default connect(mapStateToProps, { checkUsernameAvailability,checkEmailAvailability })(AddEmployeeModal);