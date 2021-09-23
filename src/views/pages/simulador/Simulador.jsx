import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';

import SimulatorForm from './components/Form';

import './Simulador.scss';

const Simulador = () => (
  <div className="_simulador-container">
    <Navbar />
    <div>
      <div className="_form-spaces">
        <SimulatorForm />
      </div>
    </div>
  </div>
);

export default Simulador;
