import { Form, Button, Container, Row } from 'react-bootstrap'

const Register = () => {
  return (
      <Container className="app" fluid>
        <Row className="row justify-content-center mt-4">
          <Form className="col-2 bg-light p-4 shadow">
            <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Email" required />
                  <Form.Text className="text-muted">
                  Nunca compartilharemos seu e-mail com mais ninguém.
                  </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Senha" required/>
            </Form.Group>
          
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Aceitar termos" required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
            </Form>
        </Row>
      </Container>
    );
}

export default Register;