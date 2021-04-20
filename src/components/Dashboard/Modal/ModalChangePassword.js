import React, { useState, useContext } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import Firebase from 'firebase';

import ModalChangePasswordContex from '../../Context/ModalChangePasswordContex/Context'



const initialStateData = {
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: '',
};

const initialStateMessage = {
  messageCurrentPassword: '',
  messageNewPassword: '',
  messageRepeatNewPassword: '',
  cor: ''
};


const ModalChangePassword = (props) => {

  const [data, setData] = useState(initialStateData);
  const [messageTxt, setMessageTxt] = useState(initialStateMessage);
  const { showModal, setShowModal } = useContext(ModalChangePasswordContex);


  const closeModal = () => {
    setData(initialStateData);
    setMessageTxt(initialStateMessage);
    setShowModal(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const validate = () => {
    let messageCurrentPassword = '';
    let messageNewPassword = '';
    let messageRepeatNewPassword = '';
    let cor = '';

    setMessageTxt(initialStateMessage);
    
    if (data.newPassword.length < 6 && data.currentPassword.length >= 6) {
      messageNewPassword = 'A senha tem que ter minimo 6 caracteres';
      cor = 'text-danger';
    }
    
    if (data.currentPassword.length < 6) {
      messageCurrentPassword = 'A senha tem que ter minimo 6 caracteres';
      cor = 'text-danger';
    }
    
    if (data.newPassword !== data.repeatNewPassword) {
      messageRepeatNewPassword = 'As senhas não correspondem';
      cor = 'text-danger';
    }
      
      
    setMessageTxt({
      ...messageTxt,
      messageCurrentPassword,
      messageNewPassword,
      messageRepeatNewPassword,
      cor
    });

    if (messageCurrentPassword || messageNewPassword || messageRepeatNewPassword) {
      return false;
    }

    return true;
  }


  const changePassword = (event) => {

    event.preventDefault();

    const isValid = validate();

    if (isValid) {

      const UpdatePassword = async () => {

        try {
          const user = await Firebase.auth().currentUser
          const credentials = await Firebase.auth.EmailAuthProvider.credential(
            user.email,
            data.currentPassword
          );
          await user.reauthenticateWithCredential(credentials);
          await user.updatePassword(data.newPassword);

          let messageCurrentPassword = 'A senha foi alterada com sucesso.';
          let cor = 'text-success';
          setMessageTxt({
              ...messageTxt,
              messageCurrentPassword,
              cor
            });
        } catch (erros) {

          const wrongPassword = () => {
            let messageCurrentPassword = 'A senha é inválida, intente novamente.';
            let cor = 'text-danger';

            setMessageTxt({
              ...messageTxt,
              messageCurrentPassword,
              cor
            });
          }

          const tooManyRequests = () => {
            let messageCurrentPassword = 'Muitos intentos invalidos, tentei mais tarde.';
            let cor = 'text-danger';

            setMessageTxt({
              ...messageTxt,
              messageCurrentPassword,
              cor
            });
          }

          switch (erros.code) {
            case 'auth/wrong-password':
              wrongPassword();
              break;
            case 'auth/too-many-requests':
              tooManyRequests();
              break;
            default:
              break;
          }
        }
      }
      UpdatePassword();
    }
  }

  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>Alterar sua senha</Modal.Title>
        <span
          className="btn__x"
          onClick={closeModal}
        >
          &#215;
        </span>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId={"formCurrentPassword"}>
          {
            messageTxt.messageCurrentPassword
              ? <Form.Label className={messageTxt.cor}>
                  {messageTxt.messageCurrentPassword}
                </Form.Label>
              : <Form.Label className="text-muted">
                  Insira sua senha atual
                </Form.Label>
            }
          <Form.Control
            className="form-control"
            type="password"
            name="currentPassword"
            placeholder="Senha atual"
            required
            onChange={handleChange}
            value={data.currentPassword}
          />
        </Form.Group>

        <Form.Group controlId={"formNewPassword"}>
          {
            messageTxt.messageNewPassword
              ? <Form.Label className={messageTxt.cor}>
                  {messageTxt.messageNewPassword}
                </Form.Label>
              : <Form.Label className="text-muted">
                  Insira sua nova senha
                </Form.Label>
            }
          <Form.Control
            className="form-control"
            type="password"
            name="newPassword"
            placeholder="Nova senha"
            required
            onChange={handleChange}
            value={data.newPassword}
          />
        </Form.Group>

        <Form.Group controlId={"formRepeatNewPassword"}>
          {
            messageTxt.messageRepeatNewPassword
              ? <Form.Label className={messageTxt.cor}>
                  {messageTxt.messageRepeatNewPassword}
                </Form.Label>
              : <Form.Label className="text-muted">
                  Repita a nova senha
                </Form.Label>
            }
          <Form.Control
            className="form-control"
            name="repeatNewPassword"
            type="password"
            placeholder="Repita a nova senha"
            required
            onChange={handleChange}
            value={data.repeatNewPassword}
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
          onClick={changePassword}
        >
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalChangePassword;