import React, { useState, useContext} from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

import Firebase from 'firebase'
import Context from '../../Context/Context'

const initialStateForm = {
      nome: '',
      idade: '',
      estadoCivil: '',
      cpf: '',
      cidade: '',
      estado: '',
    };

const ModalAdd = (props) => {

  const { token } = useContext(Context);
  const [form, setForm] = useState(initialStateForm);
  
  const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value
      });
    };

  const addNewData = () => {
      Firebase.firestore().collection("users").doc(token)
        .collection("registeredPeople").add(form)
        .then((data) => {
        }).catch((err) => {
          console.log(err)
        })
      
      setForm(initialStateForm);
      props.setModalAdd(false);
    };

  return (
    <Modal show={props.modalAdd}>
          <Modal.Header>
            <Modal.Title>Adicionar Persona</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            
            <Form.Group controlId="formNome">
              <Form.Label>
                Nome:
            </Form.Label>

              <Form.Control
                className="form-control"
                name="nome"
                type="text"
                onChange={handleChange}
                value={form.nome}
              />
            </Form.Group>
          
            <Form.Group controlId="formIdade">
              <Form.Label>
                Idade:
            </Form.Label>

              <Form.Control
                className="form-control"
                name="idade"
                type="number"
                onChange={handleChange}
                value={form.Idade}
              />
            </Form.Group>
            
            <Form.Group controlId="formEstadoCivil">
              <Form.Label>
                Estado Civil:
              </Form.Label>

              <Form.Control
                className="form-control"
                name="estadoCivil"
                type="text"
                onChange={handleChange}
                value={form.estadoCivil}
              />
            </Form.Group>

            <Form.Group controlId="formCPF">
              <Form.Label>
                CPF:
            </Form.Label>

              <Form.Control
                className="form-control"
                name="cpf"
                type="number"
                onChange={handleChange}
                value={form.cpf}
              />
            </Form.Group>

            <Form.Group controlId="formCidade">
              <Form.Label>
                Cidade:
            </Form.Label>

              <Form.Control
                className="form-control"
                name="cidade"
                type="text"
                onChange={handleChange}
                value={form.cidade}
              />
            </Form.Group>

            <Form.Group controlId="formEstado">
              <Form.Label>
                Estado:
            </Form.Label>

              <Form.Control
                className="form-control"
                name="estado"
                type="text"
                onChange={handleChange}
                value={form.estado}
              />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button
              color="primary"
              // onClick={props.addNewData}
              onClick={addNewData}
            >
              Adicionar
            </Button>
          
            <Button
              color="danger"
              onClick={props.notShowModalAdd}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
  );
}

export default ModalAdd;
