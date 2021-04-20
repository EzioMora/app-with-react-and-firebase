import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Context from '../Context/Context'

const RoutesPrivate = ({ component: Component, ...rest }) => {
  const { token } = useContext(Context);

  return (
    <Route
      {...rest}
      render={() => token
        ? <Component {...rest} />
        : <Redirect to="/login" />
      }
    />
  );
}

export default RoutesPrivate;