import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
