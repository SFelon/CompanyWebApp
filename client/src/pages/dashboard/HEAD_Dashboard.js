import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDepartmentList } from '../../store/actions/department_action';
import { getEmployeeListByDepartment, getAllEmployeeList } from "../../store/actions/employee_action";
import DepTable from '../../components/departments/DepTable';
import EmployeeTable from '../../components/employees/EmployeeTable';
import AddEmployeeModal from '../../components/employees/AddEmployeeModal';
import { Col, Row, Card, Icon, Skeleton, Tooltip} from 'antd';


class HEAD_Dashboard extends Component {
  state = {
    role: 'head',
    visibleModal: false,
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
    this.setState({ visibleModal: true });
  };

  handleCancel = () => {
    this.setState({ visibleModal: false });
  };

  handleCreate = (employeeRequest) => {
    this.props.addEmployee(employeeRequest);
    this.setState({ visibleModal: false });
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
      <div className="head-dashboard" style={{padding: '0 50px'}}>
        <Row gutter={16}>
          <Col span={18}>
            <Skeleton loading={this.props.isLoadingDepartments || this.props.isLoadingEmployees}>
              {this.state.departmentTable ? (
                <DepTable onClickGetEmployeeList={this.handleEmployeesListByDepartment} currentUserRole={this.state.role}/>
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
                    </Tooltip>
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
                    <Tooltip placement="bottomLeft" title="Add new employee">
                      <Icon type="plus"
                            onClick={this.showModal}
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
          <AddEmployeeModal
            visibleModal={this.state.visibleModal}
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

export default withRouter(connect(mapStateToProps, { getDepartmentList, getEmployeeListByDepartment, getAllEmployeeList,  })(HEAD_Dashboard));