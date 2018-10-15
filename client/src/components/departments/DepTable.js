import React from 'react';
import { connect } from 'react-redux';
import { deleteDepartment, editDepartment, getDepartmentList } from '../../store/actions/department_action';
import { getHeadsNames } from "../../store/actions/user_action";
import EditDepModal from './EditDepModal';
import DepartmentInfo from './DepartmentInfo';
import { Input, Table, Icon, Divider, Button, Popconfirm } from 'antd';
import '../../styles/components/DepTable.css'

class DepTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      searchText:'',
      prevDepartments: [],
      editDepartmentData: {},
      visible: false,
      data: [],
      prevHeads: [],
    };
  };

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
  };

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
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    function sortScenario(a,b){
      a = a || '';
      b = b || '';
      return b.localeCompare(a, 'pl', { sensitivity: 'base' });
    };

    const columns = [{
      title: 'Department Name',
      dataIndex: 'departmentName',
      key: 'departmentName',
      sorter: (a,b) => sortScenario(a.departmentName, b.departmentName),
      sortOrder: sortedInfo.columnKey === 'departmentName' && sortedInfo.order,
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
      onFilter: (value, record) => record.departmentName.toLowerCase().includes(value.toLowerCase()),
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
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => sortScenario(a.city, b.city),
        sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
        width: '25%',
      },
      {
        title: 'Head of Department',
        dataIndex: 'headOfDepartment',
        key: 'headOfDepartment',
        sorter: (a, b) => sortScenario(a.headOfDepartment, b.headOfDepartment),
        sortOrder: sortedInfo.columnKey === 'headOfDepartment' && sortedInfo.order,
        width: '25%',
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: this.props.currentUserRole === 'head' ?
          ((text, record) => (
            <div>
              <Button size={'small'} onClick={() => this.onClickGetEmployeeList(record.id)}>
                {`View `}
                <Icon type='solution'/>
              </Button>
            </div>
          ))
          :
          ((text, record) => (
            <div>
              <Button size={'small'} onClick={() => this.onClickGetEmployeeList(record.id)}>
                {`View `}
                <Icon type='solution'/>
              </Button>
              <Divider type='vertical' />
              <Button size={'small'} onClick={() => this.handleEdit(record.id)}>
                {`Edit `}
                <Icon type='edit'/>
              </Button>
              <Divider type='vertical' />
              <Popconfirm title='Sure to delete?' onConfirm={() => this.handleDelete(record.id)}>
                <Button size={'small'}>
                  {`Delete`}
                  <Icon type='delete'/>
                </Button>
              </Popconfirm>
            </div>
          ))
      }
    ];

  if(this.props.departments && this.props.departments.length > 0) {

    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.prevDepartments}
          rowKey={record => record.departmentName}
          onChange={this.handleChange} size='small'
          expandedRowRender={ (record) => {
             return <DepartmentInfo departmentId={record.id} />
            }
          }
        />
        <EditDepModal editDepartmentData={this.state.editDepartmentData}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  } else {
    return null;
  }
};
}

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  heads: state.user.headsName,
});

export default connect(mapStateToProps, { deleteDepartment, editDepartment, getDepartmentList, getHeadsNames })(DepTable);
