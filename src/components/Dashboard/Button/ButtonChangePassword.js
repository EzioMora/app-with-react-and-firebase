import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'

import ModalChangePasswordContex from '../../Context/ModalChangePasswordContex/Context'

const ButtonChangePasswordComponent = () => {
  const { setShowModal } = useContext(ModalChangePasswordContex);

  const openModal = () => {
    setShowModal(true);
  }

  return (
    <Button
    className="btn-lg px-2 mr-2"
    variant="primary"
    onClick={openModal}
    >
      Alterar Senha
    </Button>
  );
}

export default ButtonChangePasswordComponent;