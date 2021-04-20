import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import Firebase from 'firebase';
import './ModalResetSenha.css'


const initialStateData = {
  email: ''
};

const initialStateMessage = {
  message: '',
  cor: ''
};

const ModalResetSenha = (props) => {

  const [data, setData] = useState(initialStateData);
  const [messageTxt, setMessageTxt] = useState(initialStateMessage);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const closeModal = () => {
    setData(initialStateData);
    setMessageTxt(initialStateMessage);
    props.setShowModalResetPassword(false);
  }

  // validating formulating before submit
  const validate = () => {
    let message = '';
    let cor = '';

    if (!data.email) {
      message = 'Insira um e-mail válido';
      cor =  'text-danger'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(data.email)) {
      message = 'Insira um e-mail válido';
      cor =  'text-danger'
      
    }

    setMessageTxt({
      ...messageTxt,
      message,
      cor
    });

    if (message) {
      return false;
    }

    return true;
  }

  const resetPassword = (event) => {

    event.preventDefault();

    const isValid = validate();
    
    if (isValid) {
      const emailAddress = data.email;
    console.log("to aqui")

      Firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
        let message = 'Enviamos o link com as etapas a seguir para o seu e-mail';
        let cor = 'text-success';

        setMessageTxt({
          ...messageTxt,
          message,
          cor
        })
      }).catch(function (error) {
        
        const errorCode = error.code;

        if (errorCode === "auth/user-not-found") {
          let message = 'Não há registro de usuário correspondente a este email.';
          let cor = 'text-danger';

          setMessageTxt({
            ...messageTxt,
            message,
            cor
          });
        }
        console.log(error);
      });
    }

    setData(initialStateData);
  }

  return (
    <Modal show={props.showModalResetPassword}>
      <Modal.Header>
        <Modal.Title>Redefina sua senha </Modal.Title>
        <span
          className="btn__x"
          onClick={closeModal}
        >
          &#215;
        </span>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId={"formResetPassword"}>
        
        {
          messageTxt.message
            ? <Form.Label className={messageTxt.cor}>
                {messageTxt.message}
              </Form.Label>
            : <Form.Label className="text-muted">
                Insira seu email para receber um link e redefinir sua senha
              </Form.Label>
        }

        <Form.Control
          className="form-control"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={data.email}
        />
      </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={closeModal}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={resetPassword}
        >
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResetSenha;