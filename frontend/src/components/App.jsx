import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from '../screens/Signup/Signup';
// import { Header, Footer } from './Layouts';
const App = () => {
  return (
    <div>
   {/* <Header /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
