import React from 'react';
import { connect } from 'react-redux';
import { Input, Table, Icon, Button } from 'antd';
import '../../styles/components/EmployeeTable.css'

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      filteredInfo: null,
      searchText:'',
      prevDepartments: [],
      editDepartmentData: {},
      visible: false,
      data: [],
      prevHeads: [],
    };
  };

  /*
  static getDerivedStateFromProps(props, state) {
    if (props.departments && props.departments.length !== state.prevDepartments.length
      && state.editDepartmentData) {
      return {
        prevDepartments: props.departments,
      }
    }
    if (props.heads && props.heads !== state.prevHeads) {
      let names = props.heads.map((element) => ({
        text: element.firstName + " " + element.lastName,
        value: element.username,
      }));
      return {
        data: names,
        prevHeads: props.heads,
      };
    }
    else {
      return null;
    }
  };*/

  handleEdit(id) {
    this.setState({
      editDepartmentData: this.state.prevDepartments.find(element => element.id === id)
    });
    this.showModal();
  };

  showModal() {
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
      const editDepRequest = Object.assign({}, values);
      this.props.editDepartment(editDepRequest, this.state.editDepartmentData.id);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
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

  handleDelete(id) {
    this.props.deleteDepartment({id});
  };

  onClickGetEmployeeList = (id) => {
    this.props.onClickGetEmployeeList(id);
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
            <Button size={'small'} onClick={() => this.onClickGetEmployeeList(record.id)}>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees.employees,
});

export default connect(mapStateToProps, {  })(EmployeeTable);
