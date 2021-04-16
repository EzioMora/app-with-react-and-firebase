import { useState } from "react"
import { Form, Button, Container, Row } from 'react-bootstrap'
import Firebase from 'firebase'

const Dashboard = () => {
  return (
    <>
      <h1>Hola Mundo</h1>
      <button onClick={() => Firebase.auth().signOut()}>
        Sair
      </button>
    </>
  );
};

export default Dashboard;