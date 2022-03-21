import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import { CommercialForm, RealEstateForm, WalletForm } from '../OperationForms';

const OperationalFields = ({ formField }) => {
  const { values } = useFormikContext();

  const { simulationType } = values;

  const formSelector = (simulationType) => {
    let component;
    const { value, currentDeal, time, type } = formField;

    if (simulationType === 1)
      component = (
        <RealEstateForm
          formField={{ value, currentDeal, time, type, ...formField.realEstate }}
          currencySymbol={'COP'}
        />
      );
    if (simulationType === 2)
      component = (
        <CommercialForm
          formField={{ value, currentDeal, time, type, ...formField.commercial }}
          currencySymbol={'COP'}
        />
      );

    if (simulationType === 3)
      component = (
        <WalletForm
          formField={{ value, currentDeal, time, type, ...formField.wallet }}
          currencySymbol={'COP'}
        />
      );

    return component;
  };

  return <React.Fragment>{formSelector(simulationType)}</React.Fragment>;
};

OperationalFields.propTypes = {
  formField: PropTypes.object.isRequired,
};

export default OperationalFields;
