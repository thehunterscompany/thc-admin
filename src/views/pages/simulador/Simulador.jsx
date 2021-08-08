import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';

import SimulatorForm from './components/Form';
import Simulation from './components/Simulation';

import './Simulador.scss';

const Simulador = () => (
  <div className="_simulador-container">
    <Navbar />
    <div>
      <div className="_form-spaces">
        <h1>Para darte la mejor opción necesitamos algunos datos</h1>
        <Simulation />
      </div>
    </div>
  </div>
);

export default Simulador;
