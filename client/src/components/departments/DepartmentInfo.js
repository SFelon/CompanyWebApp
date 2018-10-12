import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getDepartmentInfo } from '../../store/actions/department_action';
import { Icon } from 'antd';

class DepartmentInfo extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.getDepartmentInfo(this.props.departmentId);
  }

  render() {
    return (
      <div style={{ fontSize: '16px', lineHeight: '24px'}}>
        <Icon size={"large"} type={"smile"} style={{ padding: '12px'}}></Icon>{` Nº of employees: ${this.props.departmentInfo.numberOfUsers} `}
        <br/>
        <Icon size={"large"} type={"line-chart"} style={{ padding: '12px'}}></Icon>{` Average salary: ${this.props.departmentInfo.averageSalary} `}
        <br/>
        <Icon size={"large"} type={"bar-chart"} style={{ padding: '12px'}}></Icon>{` Median salary: ${this.props.departmentInfo.medianSalary} `}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  departmentInfo: state.departmentInfo.departmentInfo,
});

export default connect(mapStateToProps, { getDepartmentInfo })(DepartmentInfo);

