import React from 'react';
import PropTypes from 'prop-types';

import { CommercialForm, RealEstateForm, WalletForm } from '../OperationForms';

const OperationalFields = ({ formField, values }) => {
  const formSelector = (simulationType) => {
    let component;
    const { value, currentDeal, time } = formField;

    if (simulationType === 1)
      component = (
        <RealEstateForm
          formField={{ value, currentDeal, time, ...formField.realEstate }}
          values={values}
          currencySymbol={'COP'}
        />
      );
    if (simulationType === 2)
      component = (
        <CommercialForm
          formField={{ value, currentDeal, time, ...formField.commercial }}
          values={values}
          currencySymbol={'COP'}
        />
      );

    if (simulationType === 3)
      component = (
        <WalletForm
          formField={{ value, currentDeal, time, ...formField.wallet }}
          values={values}
          currencySymbol={'COP'}
        />
      );

    return component;
  };

  return <React.Fragment>{formSelector(values.simulationType)}</React.Fragment>;
};

OperationalFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default OperationalFields;
