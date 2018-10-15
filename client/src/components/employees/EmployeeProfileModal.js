import React, { Component } from 'react';
import {Avatar, Button, Modal} from 'antd';

class EmployeeProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      data: this.props.employeeData,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible !== state.visible) {
      return {
        visible: props.visible,
      };
    } else {
      return null;
    }
  }

  render() {
    if (this.props.employeeData) {
      return (
        <Modal
          title={<span><Avatar icon="smile"
                               style={{backgroundColor: '#13c2c2'}}/>{` @${this.props.employeeData.username} User Profile`}</span>}
          visible={this.state.visible}
          onCancel={this.props.onCancel}
          footer={[
            <Button key="back" onClick={this.props.onCancel}>Return</Button>,
          ]}
        >
          <p>{`First name: ${this.props.employeeData.firstName}`}</p>
          <p>{`Last name: ${this.props.employeeData.lastName}`}</p>
          <p>{`Email: ${this.props.employeeData.email}`}</p>
          <p>{`Business phone: ${this.props.employeeData.businessPhone}`}</p>
          <p>{`Private phone: ${this.props.employeeData.privatePhone}`}</p>
          <p>{`Department: ${this.props.employeeData.departmentName}`}</p>
          <p>{`Date of employment: ${this.props.employeeData.dateOfEmployment}`}</p>
          <p>{`Last logged: ${this.props.employeeData.lastLogged}`}</p>
          <p>{`Account active: ${this.props.employeeData.accountActive}`}</p>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export default EmployeeProfileModal;
