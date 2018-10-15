import React from 'react';
import { connect } from 'react-redux';
import {Input, Table, Icon, Button, Skeleton} from 'antd';
import EmployeeProfileModal from './EmployeeProfileModal';
import '../../styles/components/EmployeeTable.css'

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      filteredInfo: null,
      searchText:'',
      employeeData: null,
      employeeProfileIsVisible: false,
    };
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  onClickGetEmployeeList = (id) => {
    this.props.onClickGetEmployeeList(id);
  };

  onClickGetEmployeeProfile = (id) => {
   const employeeData = this.props.employees.find(element => element.id === id);
   this.setState({
     employeeData,
   });
    this.showModal();
  };

  showModal() {
    this.setState({
      employeeProfileIsVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      employeeProfileIsVisible: false,
    })
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    function sortScenario(a,b){
      a = a || '';
      b = b || '';
      return b.localeCompare(a, 'pl', { sensitivity: 'base' });
    };

    const columns = [{
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a,b) => sortScenario(a.lastName, b.lastName),
      sortOrder: sortedInfo.columnKey === 'lastName' && sortedInfo.order,
      width: '30%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown'>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder='Search Name'
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#13c2c2' : '#aaa' }} />,
      onFilter: (value, record) => record.lastName.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className='highlight'>{fragment}</span> : fragment
            ))}
          </span>
        ) : text;
      },
    },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: (a, b) => sortScenario(a.firstName, b.firstName),
        sortOrder: sortedInfo.columnKey === 'firstName' && sortedInfo.order,
        width: '25%',
      },
      {
        title: 'Department',
        dataIndex: 'departmentName',
        key: 'departmentName',
        filters: [
          { text: 'departmentName', value: 'depName' },
          { text: 'xx', value: 'yy'},
        ],
        filteredValue: filteredInfo.departmentName || null,
        onFilter: (value, record) => record.departmentName.includes(value),
        sorter: (a, b) => sortScenario(a.departmentName, b.departmentName),
        sortOrder: sortedInfo.columnKey === 'departmentName' && sortedInfo.order,
        width: '25%',
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <div>
            <Button size={'small'} onClick={() => this.onClickGetEmployeeProfile(record.id)}>
              {`View Profile`}
              <Icon type='solution'/>
            </Button>
          </div>
        ),
      }
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.employees}
          rowKey={record => record.id}
          onChange={this.handleChange} size='small'
        />
        <EmployeeProfileModal
          employeeData={this.state.employeeData}
          visible={this.state.employeeProfileIsVisible}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees.employees,
});

export default connect(mapStateToProps, {  })(EmployeeTable);
