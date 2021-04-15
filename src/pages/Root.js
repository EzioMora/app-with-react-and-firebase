import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Register from './Register/Register'

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Register}/>
            </Switch>
        </Router>
    )
};

export default Root;