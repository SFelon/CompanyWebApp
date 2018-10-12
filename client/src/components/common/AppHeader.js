import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../../store/actions/auth_action';
import { getUserProfile } from '../../store/actions/user_action';
import { Menu, Icon, Layout, Avatar, Modal, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = Layout.Header;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  };

  handleClick = (e) => {
    switch (e.key) {
      case 'profile':
        this.props.getUserProfile(this.props.currentUser.username);
        this.showModal();
        break;
      case 'logout':
        this.props.logoutAction();
        this.props.history.push("/");
        break;
      default:
    };
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false });
  };

  //TODO enhance modal look
  renderModal = () => {
    if(this.props.userData) {
      return (
        <Modal
          title={<span><Avatar icon="smile" style={{ backgroundColor: '#13c2c2' }} />{` @${this.props.currentUser.username} User Profile`}</span>}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
          ]}
        >
          <p>{`First name: ${this.props.userData.firstName}`}</p>
          <p>{`Last name: ${this.props.userData.lastName}`}</p>
          <p>{`Email: ${this.props.userData.email}`}</p>
          <p>{`Business phone: ${this.props.userData.businessPhone}`}</p>
          <p>{`Private phone: ${this.props.userData.privatePhone}`}</p>
          <p>{`Department: ${this.props.userData.department}`}</p>
          <p>{`Date of employment: ${this.props.userData.dateOfEmployment}`}</p>
          <p>{`Last logged: ${this.props.userData.lastLogged}`}</p>
          <p>{`Account active: ${this.props.userData.accountActive}`}</p>
        </Modal>
      );
    };
  };

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Header className='app-header'>
          <div className='container'>
            <div className='app-title' style={{ fontSize: '24px', lineHeight: '64px', float: 'left'}}>
              <Link to='/'> <Icon type='reconciliation' theme='outlined'/> Company App </Link>
            </div>
            <Menu
              className='app-menu'
              mode='horizontal'
              style={{lineHeight: '64px', float: 'right'}}
              onClick={this.handleClick}
              selectedKeys={[]}
            >
              <SubMenu title={<span><Icon type='setting'/> User </span>}>
                <MenuItemGroup title={
                  <span><Avatar icon="smile" style={{ backgroundColor: '#13c2c2' }} />{` @${this.props.currentUser.username}`}</span>
                }>
                  <Menu.Item key='profile'>
                    <Icon type='user'/>Profile</Menu.Item>
                  <Menu.Item key='logout'>
                    <Icon type='logout'/>Logout</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            </Menu>
          </div>
          {this.renderModal()}
        </Header>
      );
    } else {
      return null;
    };
  };
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default withRouter(connect(mapStateToProps, { logoutAction , getUserProfile })(AppHeader));
