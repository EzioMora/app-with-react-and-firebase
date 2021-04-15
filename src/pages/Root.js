import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Register from './Register/Register'
import Login from './Login/Login'

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Register} />
                <Route exact path="/login" component={Login}/>
            </Switch>
        </Router>
    )
};

export default Root;