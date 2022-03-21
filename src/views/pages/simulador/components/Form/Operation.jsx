import React from 'react';
import PropTypes from 'prop-types';

import { CommercialForm, RealEstateForm, WalletForm } from '../OperationForms';

const OperationalFields = ({ formField, values, setFieldValue }) => {
  const formSelector = (simulationType) => {
    let component;
    const { value, currentDeal, time, type } = formField;

    if (simulationType === 1)
      component = (
        <RealEstateForm
          formField={{ value, currentDeal, time, type, ...formField.realEstate }}
          timeVal={values.time}
          currencySymbol={'COP'}
        />
      );
    if (simulationType === 2)
      component = (
        <CommercialForm
          formField={{ value, currentDeal, time, type, ...formField.commercial }}
          timeVal={values.time}
          currencySymbol={'COP'}
          setFieldValue={setFieldValue}
        />
      );

    if (simulationType === 3)
      component = (
        <WalletForm
          formField={{ value, currentDeal, time, type, ...formField.wallet }}
          timeVal={values.time}
          currencySymbol={'COP'}
          setFieldValue={setFieldValue}
        />
      );

    return component;
  };

  return <React.Fragment>{formSelector(values.simulationType)}</React.Fragment>;
};

OperationalFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
};

export default OperationalFields;
