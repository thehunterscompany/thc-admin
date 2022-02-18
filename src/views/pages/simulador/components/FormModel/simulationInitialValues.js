import formFields from './simulationFormModel';

const {
  formField: { personal, financial, operational, credential },
} = formFields;

const personalValues = {
  [personal.firstNames.name]: '',
  [personal.lastNames.name]: '',
  [personal.documentType.name]: '',
  [personal.documentId.name]: '',
  [personal.dateOfBirth.name]: '',
  [personal.email.name]: '',
  [personal.state.name]: '',
  [personal.city.name]: '',
  [personal.telephone.name]: '',
  [personal.simulation.name]: '',
  [personal.simulationType.name]: '',
  checkedA: false,
  checkedB: false,
};

const financialValues = {
  [financial.mainEmployment.name]: '',
  [financial.laborTime.name]: '',
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
