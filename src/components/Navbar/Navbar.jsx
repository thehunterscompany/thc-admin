import React from 'react';
import { CNavbar, CNavbarBrand, CContainer } from '@coreui/react';
import './Navbar.scss';

const Navbar = () => (
  <header className="_navbar">
    <CNavbar expand="lg">
      <CContainer className="_navbar-container" fluid>
        <div className="_navbar-content">
          <CNavbarBrand href="http://thcsas.com.co">
            <img src="img/logo/Logo.svg" alt="Logo" height="60px" />
          </CNavbarBrand>
          <div className="_navbar-text ">
            <strong>Simulador </strong>
          </div>
        </div>
      </CContainer>
    </CNavbar>
  </header>
);

export default Navbar;
