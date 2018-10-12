import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getHeadsNames } from '../../store/actions/user_action';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const AddDepModal = Form.create()(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      prevHeads: [],
    };
  };

  static getDerivedStateFromProps(props, state) {
    if (props.heads && props.heads !== state.prevHeads) {
      let names = props.heads.map((element) => ({ 
      text: element.firstName + " " + element.lastName,
      value: element.username,
    }));
        return {
          data: names,
          prevHeads: props.heads,
        };
      };
    return null;
  };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
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
        title="Add New Department"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal">
          <FormItem
            {...formItemLayout}
            label="Department Name">
            {getFieldDecorator('departmentName', {
              rules: [{
                required: true, message: 'Please input the department name!'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="City">
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please input the city!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Head of Department"
          >
            {getFieldDecorator('headOfDepartment', {
              rules: [{ type: 'string', required: true, message: 'Please select the head of department!' }],
            })(
              <Select
              placeholder="Select employee"
              >
              {this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>  
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Minimum Salary">
            {getFieldDecorator('minSalary', {
              initialValue: 0,
            })(
              <InputNumber min={0} max={1000000} step={100} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Maximum Salary">
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
  }
);

const mapStateToProps = (state) => ({
  heads: state.user.headsName,
});

export default connect(mapStateToProps, { getHeadsNames })(AddDepModal);
