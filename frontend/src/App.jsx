import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
// import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          {/* <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute> */}
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
