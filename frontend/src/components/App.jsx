import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../screens/Home/Home.component';
import SignUp from '../screens/Signup/Signup';
// import { Header, Footer } from './Layouts';
const App = () => {
  return (
    <div>
   {/* <Header /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
