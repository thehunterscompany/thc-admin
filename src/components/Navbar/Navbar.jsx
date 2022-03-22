import React from 'react';

import './Navbar.scss';

const Navbar = () => (
  <header className="_navbar-header">
    <div className="_navbar _navbar-expand">
      <div style={{ margin: 0 }} className="_navbar-container">
        <div className="_navbar-content">
          <div className="_navbar-logo">
            <a href="https://thcsas.com.co">
              <img src="img/logo/Logo.svg" alt="Logo" height="60px" />
            </a>
          </div>
          <div className="_navbar-text ">
            <strong>Simulador </strong>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
