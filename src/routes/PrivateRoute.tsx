import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import get from 'lodash.get';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();
  const isAuth = !!get(auth, 'token', false)
  
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

//@ts-ignore
export default withRouter(PrivateRoute)
