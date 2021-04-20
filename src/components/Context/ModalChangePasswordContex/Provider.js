import React, { useState } from 'react'
import ModalChangePasswordContex from './Context'

const ModalChangePasswordProvider = (props) => {
    const [showModal, setShowModal] = useState(false);
    
     return (
       <ModalChangePasswordContex.Provider value={{ showModal, setShowModal }}>
      {props.children}
    </ModalChangePasswordContex.Provider>
  )
}

export default ModalChangePasswordProvider;