import React from 'react';
import './Simulador.scss';
import Navbar from '../../../components/Navbar/Navbar';
import Simulation from './components/Simulation';
import SimulatorForm from './components/Form';

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
