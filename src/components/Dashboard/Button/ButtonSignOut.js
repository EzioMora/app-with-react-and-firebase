import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import Firebase from 'firebase'

import Context from '../../Context/Context'

const ButtonSignOutComponent = () => {

  const { setToken } = useContext(Context);
  let history = useHistory();

  const signOut = () => {
      Firebase.auth().signOut();
      setToken(null)
      history.push("/login");
    };

  return (
    <Button
      className="btn-lg px-4"
      variant="danger"
      onClick={signOut}>
      Sair
    </Button>
  );
}

export default ButtonSignOutComponent;
