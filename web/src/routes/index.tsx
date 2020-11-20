import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';

import Signin from '../pages/Signin/index';
import Signup from '../pages/Signup/index';
import Dashboard from '../pages/Dashboard/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
