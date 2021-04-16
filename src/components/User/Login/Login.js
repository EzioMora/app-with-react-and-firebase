import React, { useState, useEffect } from "react"
import { Form, Button, Container, Row } from 'react-bootstrap'
import Firebase from 'firebase';


const UserLogin = () => {

  const initialStateData = {
  email: '',
  password: '' 
  };

  const initialStateErrors = {
  emailError: '',
  passwordError: ''
  };

  const [dados, setDados] = useState(initialStateData);
  const [errors, setErrors] = useState(initialStateErrors);

  const handleInputChange = (event) => {
    setDados({
      ...dados,
      [event.target.name]: event.target.value
    })
    setErrors(initialStateErrors);
  };


  // validating formulating before submit
  const validate = () => {
    let emailError = '';
    let passwordError = '';

    if (!dados.email) {
      emailError = 'Insira um e-mail válido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(dados.email)) {
        emailError = 'Insira um e-mail válido';
    }

    if (dados.password.length < 6) {
        passwordError = 'A senha tem que ter minimo 6 caracteres';
    }
    
    setErrors({
      ...errors,
      emailError,
      passwordError
    });

    if (emailError || passwordError) {
      return false;
    }

    return true;
  }

  function handleSubmit(event) {

    event.preventDefault();

    const isValid = validate();
    
      if (isValid) {

        Firebase.auth().signInWithEmailAndPassword(dados.email, dados.password)
        .then((userCredential) => {
            // Signed in
            // var user = userCredential.user;
            // ...
        })
          .catch((error) => {

            var errorCode = error.code;
              
            const userInvalid = () => {
              let emailError = 'Não há registro de usuário correspondente a este email.';
              setErrors({
                ...errors,
                emailError
              });
            };

            const passwordInvalid = () => {
              let passwordError = 'A senha é inválida, intente novamente.';
              setErrors({
                ...errors,
                passwordError
              });
            };
            
            switch (errorCode) {
              case 'auth/user-not-found':
                userInvalid();
                break;
              case 'auth/wrong-password':
                passwordInvalid();
                break;
              default:
                break;
            }
        });
      }
      setDados(initialStateData);
  }

  return (
      <Container className="app" fluid>
        <Row className="row justify-content-center mt-4">
        <Form className="col-2 bg-light p-4 shadow" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              name="email"
              value={dados.email}
              onChange={handleInputChange}
            />
            
            {errors.emailError
              ? <Form.Text className="text-danger">
                  {errors.emailError}
                </Form.Text>
              : <Form.Text className="text-muted">
                  Nunca compartilharemos seu e-mail com mais ninguém.
                </Form.Text>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                required
                name="password"
                value={dados.password}
                onChange={handleInputChange}
              />
              <Form.Text className="text-danger">
                    {errors.passwordError}
              </Form.Text>
            </Form.Group>
          
          <Button
            variant="primary"
            type="submit"
          >
                  Acessar
            </Button>
          </Form>
        </Row>
      </Container>
    );
}

export default UserLogin;
