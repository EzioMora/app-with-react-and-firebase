import { useState, useContext } from "react"
import { Form, Button, Container, Row } from 'react-bootstrap'
import Firebase from 'firebase';
import { useHistory } from "react-router-dom";
import './Register.css'
import Context from '../../Context/Context'

const UserRegister = () => {

  let history = useHistory();


  const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  };

  const [dados, setDados] = useState(initialState);
  const { setToken } = useContext(Context);


  const handleInputChange = (event) => {
    const { value, name } = event.target
    setDados({
      ...dados,
      [name]: value
    })
  };


  // validating formulating before submit
  const validate = () => {
    let emailError = '';
    let passwordError = '';

    // remove old error messages before validating new data
    const cleanOldErrors = () => {
      setDados({
        ...dados,
        emailError,
        passwordError
      });
    };

    cleanOldErrors();

    if (!dados.email) {
      emailError = 'Insira um e-mail válido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(dados.email)) {
      emailError = 'Insira um e-mail válido'
    }

    if (dados.password.length < 6) {
      passwordError = 'A senha tem que ter minimo 6 caracteres'
    }
    
    if (emailError || passwordError) {
      setDados({
        ...dados,
        emailError,
        passwordError
      });
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    

    event.preventDefault();

    const isValid = validate();
    if (isValid) {

      

      Firebase.auth().createUserWithEmailAndPassword(dados.email, dados.password)
        .then((userCredential) => {
          
          // localStorage.setItem('authToken', userCredential.user.uid)
          setToken(userCredential.user.uid);
          history.push('/dashboard')

          // Firebase.firestore().collection(dados.email).doc(dados.email)
          //   .collection("pessoas");
          //   // .add({pessoas: "nada"});
          
      })
      .catch((error) => {
        var errorCode = error.code;

        const databaseErros = (message) => {
          let emailError = message;
          setDados({
            ...dados,
            emailError
          })
        }

        switch (errorCode) {
          case 'auth/email-already-in-use':
            databaseErros('O endereço de e-mail já está sendo usado por outra conta.');
            break;
          default:
            break;
        }
        // ..
      });

    

    setDados(initialState);
    }
  }

  const redirectLogin = () => {
    history.push("/login")
  };

  return (
      <Container className="app" fluid>
        <Row className="row justify-content-center mt-4">
        <Form className="col-2 bg-light p-4 shadow">
          <h1>Cadastre-se</h1>
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
            
            { dados.emailError ? 
              <Form.Text className="text-danger">
                  {dados.emailError}
              </Form.Text> :
              <Form.Text className="text-muted">
                  Nunca compartilharemos seu e-mail com mais ninguém.
              </Form.Text> }
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
                    {dados.passwordError}
              </Form.Text>
            </Form.Group>
          
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="btn-lg btn-block"
          >
            Cadastrar
            </Button>
          <Form.Text className="text-muted text-right">
            Já tem uma conta? <span className="text-primary pointer" onClick={redirectLogin}>Acessar</span>
          </Form.Text>
          </Form>
        </Row>
      </Container>
    );
}

  export default UserRegister;
