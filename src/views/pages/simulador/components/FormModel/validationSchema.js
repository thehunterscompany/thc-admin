import * as Yup from 'yup';

import formFields from './simulationFormModel';

const {
  formField: { personal, financial, operational, credential },
} = formFields;

export const personalValidation = Yup.object().shape({
  [personal.firstNames.name]: Yup.string().required(personal.firstNames.requiredErrorMsg),
  [personal.lastNames.name]: Yup.string().required(personal.lastNames.requiredErrorMsg),
});
