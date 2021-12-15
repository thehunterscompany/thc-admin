import formFields from './simulationFormModel';

const {
  formField: { personal, financial, operational, credential },
} = formFields;

const personalValues = {
  [personal.firstNames.name]: 'A',
  [personal.lastNames.name]: 'B',
  [personal.documentType.name]: 'Cedula de ciudadanía',
  [personal.documentId.name]: '1341413',
  [personal.dateOfBirth.name]: '2021-12-06T17:07:00.000Z',
  [personal.email.name]: 'a@gmail.com',
  [personal.location.name]: { state: 'Atlántico', label: 'Barranquilla' },
  [personal.telephone.name]: '124',
  [personal.simulation.name]: 2,
  [personal.simulationType.name]: 1,
  checkedA: false,
  checkedB: false,
};

const financialValues = {
  [financial.mainEmployment.name]: '134',
  [financial.laborTime.name]: '1234',
  [financial.earnings.name]: '1234',
  [financial.passive.name]: '1234',
  [financial.tenants.name]: [],
};

const operationalValues = {
  [operational.value.name]: '',
  [operational.currentDeal.name]: '',
  [operational.time.name]: '',
  realEstate: {
    [operational.realEstate.realEstateType.name]: '',
    [operational.realEstate.type.name]: '',
  },
  commercial: {
    [operational.commercial.realEstateType.name]: '',
  },
  wallet: {
    [operational.wallet.currentDealMonth.name]: '',
    [operational.wallet.institution.name]: '',
    [operational.wallet.rates.name]: '',
  },
};

const credentialValues = {
  [credential.password.name]: '',
  [credential.repeatPassword.name]: '',
};

export { credentialValues, financialValues, operationalValues, personalValues };
