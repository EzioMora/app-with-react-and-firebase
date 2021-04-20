import React from 'react'
import { Button } from 'react-bootstrap'

const ButtonAddComponent = (props) => {
  return (
    <Button
      className="btn-lg"
      variant="success"
      onClick={props.showModalAdd}
    >
      Novo
    </Button>
  );
}

export default ButtonAddComponent;