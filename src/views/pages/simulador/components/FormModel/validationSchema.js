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
  [personal.state.name]: Yup.string().required(personal.state.requiredErrorMsg),
  [personal.city.name]: Yup.string().required(personal.city.requiredErrorMsg),
  [personal.documentId.name]: Yup.string()
    .required(personal.documentType.requiredErrorMsg)
    .matches(/^\d+$/, personal.documentId.invalidErrorMsg),
  [personal.dateOfBirth.name]: Yup.string()
    .required(personal.dateOfBirth.requiredErrorMsg)
    .nullable()
    .test('valid-date', personal.dateOfBirth.invalidErrorMsg, function (value) {
      let date_parser = Date.parse(value);
      if (isNaN(date_parser)) {
        return false;
      }
      return true;
    }),
  [personal.email.name]: Yup.string()
    .required(personal.email.requiredErrorMsg)
    .email(personal.email.invalidErrorMsg),
  [personal.telephone.name]: Yup.string()
    .required(personal.telephone.requiredErrorMsg)
    .matches(/^[+]\d{2} [(]\d{3}[)] \d{3}[-]\d{4}$/, personal.telephone.invalidErrorMsg),
  [personal.simulation.name]: Yup.number().required(personal.simulation.requiredErrorMsg),
  [personal.simulationType.name]: Yup.number().test(
    'is-required',
    personal.simulationType.requiredErrorMsg,
    function (value) {
      if (this.parent.simulation === 1 && value === undefined) {
        return false;
      }
      return true;
    },
  ),
});

export const financialValidation = Yup.object().shape({
  [financial.mainEmployment.name]: Yup.string().required(
    financial.mainEmployment.requiredErrorMsg,
  ),
  [financial.laborTime.name]: Yup.string()
    .required(financial.laborTime.requiredErrorMsg)
    .matches(/^\d+$/, financial.laborTime.invalidErrorMsg),
  [financial.earnings.name]: Yup.string().required(financial.earnings.requiredErrorMsg),
  [financial.passive.name]: Yup.string().required(financial.passive.requiredErrorMsg),
  [financial.tenants.name]: Yup.array().of(
    Yup.object().shape({
      firstNames: Yup.string().required(personal.firstNames.requiredErrorMsg),
      lastNames: Yup.string().required(personal.lastNames.requiredErrorMsg),
      earnings: Yup.string().required(financial.earnings.requiredErrorMsg),
    }),
  ),
});

const operationalValidation = Yup.object().shape({
  [operational.value.name]: Yup.string().required(operational.value.requiredErrorMsg),
  [operational.currentDeal.name]: Yup.string()
    .required(operational.currentDeal.requiredErrorMsg)
    .test(
      'valid-percentage-credito-hipotecario',
      'Para credito hipotecario, la máxima financiación es hasta el 70% del valor de la vivienda!',
      function (value) {
        if (value && this.parent.value) {
          if (
            this.parent.type === 'Crédito Hipotecario' ||
            this.parent.simulationType === 3
          ) {
            return Math.round(
              (parseInt(value.replaceAll(/,/g, '').split(' ')[1]) /
                parseInt(this.parent.value.replaceAll(/,/g, '').split(' ')[1])) *
                100,
            ) <= 70
              ? true
              : false;
          }
        }
        return true;
      },
    )
    .test(
      'valid-percentage-leasing-habitacional',
      'Para leasing habitacional, la máxima financiación es hasta el 80% del valor de la vivienda!',
      function (value) {
        if (value && this.parent.value) {
          if (this.parent.type === 'Leasing Habitacional') {
            return Math.round(
              (parseInt(value.replaceAll(/,/g, '').split(' ')[1]) /
                parseInt(this.parent.value.replaceAll(/,/g, '').split(' ')[1])) *
                100,
            ) <= 80
              ? true
              : false;
          }
        }
        return true;
      },
    )
    .test(
      'valid-percentage-linea-comercial',
      'Para linea comercial, la máxima financiación es hasta el 50% del valor de la vivienda!',
      function (value) {
        if (value && this.parent.value) {
          if (this.parent.simulationType === 2) {
            return Math.round(
              (parseInt(value.replaceAll(/,/g, '').split(' ')[1]) /
                parseInt(this.parent.value.replaceAll(/,/g, '').split(' ')[1])) *
                100,
            ) <= 50
              ? true
              : false;
          }
        }
        return true;
      },
    ),
  [operational.time.name]: Yup.string()
    .required(operational.time.requiredErrorMsg)
    .matches(/^\d+$/, operational.time.invalidErrorMsg)
    .test('valid-time', operational.time.invalidErrorMsg1, function (value) {
      if (value > 20 || value < 5) {
        return false;
      }
      return true;
    }),
  [operational.type.name]: Yup.string().required(operational.type.requiredErrorMsg),
});

export const realEstateValidation = Yup.object()
  .shape({
    [realEstate.realEstateType.name]: Yup.string().required(
      realEstate.realEstateType.requiredErrorMsg,
    ),
  })
  .concat(operationalValidation);

export const commercialValidation = Yup.object()
  .shape({
    [commercial.realEstateType.name]: Yup.string().required(
      commercial.realEstateType.requiredErrorMsg,
    ),
  })
  .concat(operationalValidation);

export const walletValidation = Yup.object()
  .shape({
    [wallet.currentDealMonth.name]: Yup.string().required(
      wallet.currentDealMonth.requiredErrorMsg,
    ),
    [wallet.institution.name]: Yup.string().required(wallet.institution.requiredErrorMsg),
    [wallet.rates.name]: Yup.string().required(wallet.rates.requiredErrorMsg),
  })
  .concat(operationalValidation);

export const credentialValidation = Yup.object().shape({
  [personal.email.name]: Yup.string()
    .required(personal.email.requiredErrorMsg)
    .email(personal.email.invalidErrorMsg),
  [credential.password.name]: Yup.string()
    .min(8, credential.password.invalidErrorMsg)
    .required(credential.password.requiredErrorMsg)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*+=_:;”’?/<>,./|]).*$/,
      credential.password.invalidErrorMsg1,
    ),
  [credential.repeatPassword.name]: Yup.string()
    .min(8, credential.password.invalidErrorMsg)
    .required(credential.password.requiredErrorMsg)
    .test('passwords-match', credential.repeatPassword.invalidErrorMsg, function (value) {
      return this.parent.password === value;
    }),
});
