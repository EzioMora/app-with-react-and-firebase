import React from 'react'
import { Navbar, Image } from 'react-bootstrap'
import ButtonChangePasswordComponent from '../Button/ButtonChangePassword'
import ButtonSignOutComponent from '../Button/ButtonSignOut'


const NavBar = () => {
  return (
    <Navbar className="border-bottom border-primary p-3">
      <Image src="Logo-SoftWrap.png" className="img-size" />
      <Navbar.Collapse className="justify-content-end">
        <ButtonChangePasswordComponent />
        <ButtonSignOutComponent />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;