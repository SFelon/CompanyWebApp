import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDepartmentList, addDepartment } from '../../store/actions/department_action';
import { getHeadsNames } from "../../store/actions/user_action";
import { getEmployeeListByDepartment, getAllEmployeeList } from "../../store/actions/employee_action";
import DepTable from '../../components/departments/DepTable';
import EmployeeTable from '../../components/employees/EmployeeTable';
import AddDepModal from '../../components/departments/AddDepModal';
import { Col, Row, Card, Icon, Skeleton, Tooltip} from 'antd';

class CEO_Dashboard extends Component {
  state = {
    visible: false,
    numberOfDepartments: this.props.numberOfDepartments || 0,
    numberOfEmployees: this.props.numberOfEmployees || 0,
    departmentTable: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.numberOfDepartments && props.numberOfDepartments !== state.numberOfDepartments) {
      return {
        numberOfDepartments: props.numberOfDepartments,
      };
    }
    if (props.numberOfEmployees && props.numberOfEmployees !== state.numberOfEmployees) {
      return {
        numberOfEmployees: props.numberOfEmployees,
      };
    }
    return 0;
  };

  showModal = () => {
    this.setState({ visible: true });
    this.props.getHeadsNames();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if(values.minSalary === undefined) {
        values.minSalary = 0;
      }
      if (values.maxSalary === undefined) {
        values.maxSalary = 0;
      }
      if (err) {
        return;
      }
      const addDepRequest = Object.assign({}, values);
      this.props.addDepartment(addDepRequest);
      form.resetFields();
      this.props.getDepartmentList();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  getDepartments = () => {
    this.props.getDepartmentList();
    this.setState({
      departmentTable: true,
    });
  };

  handleEmployeesListByDepartment = (id) => {
    this.props.getEmployeeListByDepartment(id);
    this.setState({
      departmentTable: false,
    });
  };

  getAllEmployeesList = () => {
    this.props.getAllEmployeeList();
    this.setState({
      departmentTable: false,
    });
  };

  render() {
    return (
      <div className="ceo-dashboard" style={{padding: '0 50px'}}>
        <Row gutter={16}>
          <Col span={18}>
            <Skeleton loading={this.props.isLoadingDepartments || this.props.isLoadingEmployees}>
              {this.state.departmentTable ? (
                <DepTable onClickGetEmployeeList={this.handleEmployeesListByDepartment}/>
              ) : (
                <EmployeeTable />
              )}
            </Skeleton>
          </Col>
          <Col span={6}>
            <Card title={<span><Icon type='cluster' style={{padding: '0 8px', fontSize: '32px'}}/> Departments</span>}
                  actions={[
                  <Tooltip placement="bottomLeft" title="List departments">  
                    <Icon type="ordered-list"
                    onClick={this.getDepartments} />
                  </Tooltip>,
                  <Tooltip placement="bottomLeft" title="Add new department">   
                    <Icon type="plus"
                    onClick={this.showModal}
                    />
                  </Tooltip>,
                ]}
            >
              {this.state.numberOfDepartments ?
                `No of departments: ${this.state.numberOfDepartments}`
                :
                ``
              }
            </Card>
            <br></br>
            <Card title={<span><Icon type='team' style={{ padding: '0 8px', fontSize: '32px'}}/> Employees</span>}
              actions={[
                <Tooltip placement="bottomLeft" title="List All Employees">
                  <Icon type="ordered-list"
                        onClick={this.getAllEmployeesList}
                  />
                </Tooltip>,
              ]}
            >
              {this.state.numberOfEmployees ?
                `No of employees: ${this.state.numberOfEmployees}`
              :
                ``
              }
            </Card>
          </Col>
        </Row>
        <div>
          <AddDepModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  numberOfDepartments: state.departments.departments.length,
  numberOfEmployees: state.employees.employees.length,
  isLoadingDepartments: state.departments.isLoadingDepartments,
  isLoadingEmployees: state.employees.isLoadingEmployees,
});

export default withRouter(connect(mapStateToProps, { getDepartmentList, getHeadsNames, addDepartment,
  getEmployeeListByDepartment, getAllEmployeeList })(CEO_Dashboard));
