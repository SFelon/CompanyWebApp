import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/App.css';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';
import Login from './pages/login/Login';
import AppHeader from './components/common/AppHeader';
import PrivateRoute from './components/common/PrivateRoute';
import LoadingIndicator from './components/common/LoadingIndicator';
import NotFound from './components/common/NotFound';
import CEO_Dashboard from './pages/dashboard/CEO_Dashboard';
import HEAD_Dashboard from './pages/dashboard/HEAD_Dashboard';
import EMPLOYEE_Dashboard from './pages/dashboard/EMPLOYEE_Dashboard';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { role: '' };
  }

  static getDerivedStateFromProps(props) {
    if (props.isAuthenticated === true) {
      if (props.currentUser) {
        const [{ authority }] = props.currentUser.authorities;
        const role = authority.substr(5).toLowerCase();
        return {
          role,
        };
      }
    }
    return null;
  };

  render() {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <Layout className="app-container">
        <AppHeader
        isAuthenticated={this.props.isAuthenticated}
        currentUser={this.props.currentUser}
        />
        <Content className="app-content">
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/ceo" component={CEO_Dashboard} />
              <PrivateRoute exact path="/head" component={HEAD_Dashboard} />
              <PrivateRoute exact path="/employee" component={EMPLOYEE_Dashboard} />
              <Route
                exact path="/"
                render={() => !this.props.isAuthenticated ? <Login />
                  : <Redirect from="/" to={`/${this.state.role}`} />
                }
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Content>
      </Layout>
    )
  };
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default withRouter(connect(mapStateToProps, null)(App));
