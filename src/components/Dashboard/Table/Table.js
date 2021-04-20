import React from 'react'
import { Button, Table } from 'react-bootstrap'
import './Table.css'


const TableComponent = (props) => {
  

  return (
    <Table className="mt-3" striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Estado Civil</th>
                <th>CPF</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {props.dados.map((elemento, index) => (
                <tr key={elemento.id + index}>
                  <td>{elemento.nome}</td>
                  <td>{elemento.idade}</td>
                  <td>{elemento.estadoCivil}</td>
                  <td>{elemento.cpf}</td>
                  <td>{elemento.cidade}</td>
                  <td>{elemento.estado}</td>
                  <td className="actions__wrapper">
                    <Button variant="primary" className="mr-2" onClick={() => props.showModalEdit(elemento.id)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => props.deleteData(elemento.id)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
  );
}

export default TableComponent;