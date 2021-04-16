import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </Router>
    )
};

export default Root;