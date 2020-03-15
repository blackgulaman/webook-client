import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
