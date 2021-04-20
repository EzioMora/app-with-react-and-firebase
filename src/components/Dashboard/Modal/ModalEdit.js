import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

const ModalEdit = (props) => {
  return (
    <Modal show={props.modalEdit}>
          <Modal.Header>
            <Modal.Title>Editar Registro</Modal.Title>
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
                onChange={props.handleChangeUpdateDados}
                value={props.updateDados.nome}
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
                onChange={props.handleChangeUpdateDados}
                value={props.updateDados.idade}
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
                onChange={props.handleChangeUpdateDados}
                value={props.updateDados.estadoCivil}
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
                onChange={props.handleChangeUpdateDados}
                value={props.updateDados.cpf}
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
                onChange={props.handleChangeUpdateDados}
                value={props.updateDados.cidade}
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
                onChange={props.handleChangeUpdateDados}
                value={props.updateDados.estado}
              />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button
              color="primary"
              onClick={props.editData}
            >
              Editar
            </Button>
          
            <Button
              color="danger"
              onClick={props.notShowModalEdit}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
  );
}

export default ModalEdit;