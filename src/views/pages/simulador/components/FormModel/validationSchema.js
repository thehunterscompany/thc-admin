import * as Yup from 'yup';

import formFields from './simulationFormModel';

const {
  formField: { personal, financial, operational, credential },
} = formFields;

const { realEstate, commercial, wallet } = operational;

export const personalValidation = Yup.object().shape({
  [personal.firstNames.name]: Yup.string().required(personal.firstNames.requiredErrorMsg),
  [personal.lastNames.name]: Yup.string().required(personal.lastNames.requiredErrorMsg),
  [personal.documentType.name]: Yup.string().required(
    personal.documentType.requiredErrorMsg,
  ),
  [personal.documentId.name]: Yup.string()
    .required(personal.documentType.requiredErrorMsg)
    .matches(/^\d+$/, 'Este campo solo puede tener numeros'),
  [personal.dateOfBirth.name]: Yup.string()
    .required(personal.dateOfBirth.requiredErrorMsg)
    .nullable()
    .test('valid-date', 'La fecha ingresada no es válida', function (value) {
      let date = new Date(value);
      if (isNaN(date.getDate())) {
        return false;
      }
      return true;
    }),
  [personal.email.name]: Yup.string()
    .required(personal.email.requiredErrorMsg)
    .email('Este campo tiene que ser un correo electrónico válido'),
  [personal.telephone.name]: Yup.string()
    .required(personal.telephone.requiredErrorMsg)
    .matches(/^[+]\S{1,5} \d+$/, 'Por favor eliminar extra espacios en blanco'),
  [personal.simulation.name]: Yup.number().required(personal.simulation.requiredErrorMsg),
  [personal.simulationType.name]: Yup.number().required(
    personal.simulationType.requiredErrorMsg,
  ),
});

export const financialValidation = Yup.object().shape({
  [financial.mainEmployment.name]: Yup.string().required(
    financial.mainEmployment.requiredErrorMsg,
  ),
  [financial.laborTime.name]: Yup.string()
    .required(financial.laborTime.requiredErrorMsg)
    .matches(/^\d+$/, 'Solo puede contener números'),
  [financial.earnings.name]: Yup.string().required(financial.earnings.requiredErrorMsg),
  [financial.passive.name]: Yup.string()
    .required(financial.passive.requiredErrorMsg)
    .matches(/^\d+$/, 'Este campo solo puede tener numeros'),
});

const operationalValidation = Yup.object().shape({
  [operational.value.name]: Yup.string().required(operational.value.requiredErrorMsg),
  [operational.currentDeal.name]: Yup.string().required(
    operational.currentDeal.requiredErrorMsg,
  ),
  [operational.time.name]: Yup.string()
    .required(operational.time.requiredErrorMsg)
    .matches(/^\d+$/, 'Solo puede contener números'),
});

export const realEstateValidation = Yup.object().shape({
  ...operationalValidation,
  [realEstate.type.name]: Yup.string().required(realEstate.type.requiredErrorMsg),
  [realEstate.realEstateType.name]: Yup.string().required(
    realEstate.realEstateType.requiredErrorMsg,
  ),
});

export const commercialValidation = Yup.object().shape({
  ...operationalValidation,
  [commercial.realEstateType.name]: Yup.string().required(
    commercial.realEstateType.requiredErrorMsg,
  ),
});

export const walletValidation = Yup.object().shape({
  ...operationalValidation,
  [wallet.currentDealMonth.name]: Yup.string().required(
    wallet.currentDealMonth.requiredErrorMsg,
  ),
  [wallet.institution.name]: Yup.string().required(wallet.institution.requiredErrorMsg),
  [wallet.rates.name]: Yup.string().required(wallet.rates.requiredErrorMsg),
});
