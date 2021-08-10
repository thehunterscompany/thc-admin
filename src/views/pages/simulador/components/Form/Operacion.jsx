import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import useCurrencySymbol from '../../hooks/useCurrencySymbol';
import { CommercialForm, RealEstateForm, WalletForm } from '../OperacionForms';

const OperationalFields = ({ formField, values }) => {
  const currencySymbol = useCurrencySymbol(values.country);

  const formSelector = (simulationType) => {
    let component;
    if (simulationType === 1)
      component = (
        <RealEstateForm
          formField={formField.realEstate}
          values={values}
          currencySymbol={currencySymbol}
        />
      );
    if (simulationType === 2)
      component = (
        <CommercialForm
          formField={formField.commercial}
          values={values}
          currencySymbol={currencySymbol}
        />
      );

    if (simulationType === 3)
      component = (
        <WalletForm
          formField={formField.wallet}
          values={values}
          currencySymbol={currencySymbol}
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
