import formFields from './simulationFormModel';

const {
  formField: { personal, financial, operational, credential },
} = formFields;

const personalValues = {
  [personal.firstNames.name]: 'A',
  [personal.lastNames.name]: 'b',
  [personal.documentType.name]: '',
  [personal.documentId.name]: '234234',
  [personal.dateOfBirth.name]: '',
  [personal.email.name]: 'ajzpiv97@gmail.com',
  [personal.state.name]: '',
  [personal.city.name]: '',
  [personal.telephone.name]: '1234234324',
  [personal.simulation.name]: 0,
  [personal.simulationType.name]: 0,
  checkedA: true,
  checkedB: true,
};

const financialValues = {
  [financial.mainEmployment.name]: '',
  [financial.laborTime.name]: '12',
  [financial.earnings.name]: '',
  [financial.passive.name]: '',
  [financial.tenants.name]: [],
};

const operationalValues = {
  [operational.value.name]: '',
  [operational.currentDeal.name]: '',
  [operational.time.name]: '',
  [operational.type.name]: '',

  realEstate: {
    [operational.realEstate.realEstateType.name]: '',
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
