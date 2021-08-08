import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RealEstateForm, CommercialForm, WalletForm } from '../OperacionForms';

const OperationalFields = ({ formField, values }) => {
  const formSelector = (simulationType) => {
    let component;
    if (simulationType === 1)
      component = (
        <RealEstateForm formField={formField.realEstate} values={values} />
      );
    if (simulationType === 2)
      component = (
        <CommercialForm formField={formField.commercial} values={values} />
      );

    if (simulationType === 3)
      component = <WalletForm formField={formField.wallet} values={values} />;

    return component;
  };

  return <React.Fragment>{formSelector(values.simulationType)}</React.Fragment>;
};

OperationalFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default OperationalFields;
