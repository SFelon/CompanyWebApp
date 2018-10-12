import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDepartmentList } from '../../store/actions/department_action';
import { Col, Row, Card, Icon, Skeleton} from 'antd';
import DepTable from '../../components/departments/DepTable';

class EMPLOYEE_Dashboard extends Component {
  getDepartments = () => {
    this.props.getDepartmentList();
  }

  render() {
    return (
      <div className="ceo-dashboard" style={{padding: '0 50px'}}>
        <Row gutter={16}>
          <Col span={18}>
            <Skeleton loading={this.props.isLoading}>
              <DepTable />
            </Skeleton>
          </Col>
          <Col span={6}>
            <Card title={<span><Icon type='cluster' style={{padding: '0 8px', fontSize: '32px'}}/> Departments</span>}
                  actions={[
                    <Icon type="ordered-list"
                          onClick={this.getDepartments} />,
                    <Icon type="plus" />
                  ]}
            >
              Card content
            </Card>
            <br></br>
            <Card title={<span><Icon type='team' style={{ padding: '0 8px', fontSize: '32px'}}/> Users</span>}
                  actions={[<Icon type="ordered-list" />, <Icon type="edit" /> ]}
            >
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  isLoading: state.departments.isLoadingDepartments,
});

export default withRouter(connect(mapStateToProps, { getDepartmentList })(EMPLOYEE_Dashboard));