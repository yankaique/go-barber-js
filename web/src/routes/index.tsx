import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signin from '../pages/Signin/index';
import Signup from '../pages/Signup/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signup" exact component={Signup} />
  </Switch>
);

export default Routes;
