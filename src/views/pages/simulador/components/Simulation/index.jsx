import React from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import SimulatorForm from '../Form';

const Simulation = () => {
  return (
    <CRow className="justify-content-center">
      <CCol xs="8" sm="8" md="8" lg="8" xl="6">
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <SimulatorForm />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Simulation;
