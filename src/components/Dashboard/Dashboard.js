import { useState, useEffect, useContext } from "react"
import { Container } from 'react-bootstrap'

import Firebase from 'firebase'

import './Dashboard.css'

import Context from '../Context/Context'
import NavBar from './NavBar/NavBar'
import ButtonAddComponent from './Button/ButtonAdd'
import TableComponent from './Table/Table'
import PaginationComponent from '../Pagination/Pagination'
import ModalAdd from './Modal/ModalAdd'
import ModalEdit from './Modal/ModalEdit'
import ModalChangePassword from './Modal/ModalChangePassword'

import usePagination from '../../hooks/usePagination'

const initialStateForm = {
      nome: '',
      idade: '',
      estadoCivil: '',
      cpf: '',
      cidade: '',
      estado: '',
    };


const Dashboard = () => {
    const [dados, setDados] = useState([]);
    const [form, setForm] = useState(initialStateForm);
    const [updateDados, setUpdateDados] = useState('');
    const [currentId, setCurrentId] = useState(null);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const { token } = useContext(Context);
    const { updateCurrentPage, updateLastPage, itemsPerPage, lastPage, currentPage } = usePagination();
  
    useEffect(() => {
      const fetchData = async () => {
        Firebase.firestore().collection("users").doc(token)
          .collection("registeredPeople")
          .onSnapshot(data => {
            const novosDados = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))

            setDados(novosDados)
  
            const newLastPage = Math.ceil(novosDados.length / itemsPerPage);

            updateLastPage(newLastPage)
          });
      };
      fetchData();
    }, []);
  
    const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value
      });
    };
  
    const handleChangeUpdateDados = (event) => {
      setUpdateDados({
        ...updateDados,
        [event.target.name]: event.target.value
      });
    };
  

    const showModalAdd = () => setModalAdd(true);
    const notShowModalAdd = () => setModalAdd(false);

    const showModalEdit = (id) => {
      var docRef = Firebase.firestore().collection("users").doc(token)
        .collection("registeredPeople").doc(id);

      docRef.get().then((doc) => {

        if (doc.exists) {
          setUpdateDados(doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log(error);
      });

      setCurrentId(id);
      setModalEdit(true);
    };
    const notShowModalEdit = () => setModalEdit(false);


    const addNewData = () => {
      Firebase.firestore().collection("users").doc(token)
        .collection("registeredPeople").add(form)
        .then((data) => {
        }).catch((err) => {
          console.log(err)
        })
      
      setForm(initialStateForm);
      setModalAdd(false);
    };

  const editData = () => {
    Firebase.firestore().collection("users").doc(token)
    .collection("registeredPeople").doc(currentId)
        .set(updateDados).then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    
      notShowModalEdit();
      setUpdateDados(initialStateForm);
    };


    const deleteData = (id) => {
      if (window.confirm("Quer excluir?")) {
        Firebase.firestore().collection("users").doc(token)
          .collection("registeredPeople").doc(id).delete();
      }
    };


    const from = (currentPage - 1) * itemsPerPage;
    const to = currentPage * itemsPerPage;
    const sliceData = dados.slice(from, to);

    return (
      <>
        <NavBar/>
      
        <Container className="p-4">
          <ButtonAddComponent showModalAdd={() => showModalAdd()} />
          <TableComponent dados={sliceData} showModalEdit={showModalEdit} deleteData={deleteData} />
          <PaginationComponent currentPage={currentPage} updateCurrentPage={updateCurrentPage} lastPage={lastPage} />
        </Container>


        <ModalAdd modalAdd={modalAdd}
          handleChange={handleChange}
          setModalAdd={(value) => setModalAdd(value)}
          addNewData={addNewData}
          notShowModalAdd={notShowModalAdd}
          />
      
        <ModalEdit modalEdit={modalEdit}
          handleChangeUpdateDados={handleChangeUpdateDados}
          updateDados={updateDados}
          editData={() => editData()}
          notShowModalEdit={notShowModalEdit}
        />
        
        <ModalChangePassword />
      </>
    );
  };

export default Dashboard;
