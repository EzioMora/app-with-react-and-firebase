import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ContextProvider from '../components/Context/Provider'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import RoutesPrivate from '../components/Routes/Private'

import ModalChangePasswordProvider from '../components/Context/ModalChangePasswordContex/Provider'

const Root = () => {

  return (
  
    <Router>
      <ContextProvider>
        <ModalChangePasswordProvider>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/login" component={Login} />
          <RoutesPrivate exact path="/dashboard" component={Dashboard} />
          </Switch>
        </ModalChangePasswordProvider>
      </ContextProvider>
    </Router>
    
  );
};

export default Root;