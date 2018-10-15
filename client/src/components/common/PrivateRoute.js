import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ( { component: Component, ...rest} ) => {
  const { isAuthenticated } = rest;

  return (
    <Route { ...rest }
      render={props => (
      isAuthenticated ? (
        <Component  {...props }/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: {from: props.location},
        }}
        />
      )
    )}
    />
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
