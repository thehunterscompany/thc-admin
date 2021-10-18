import * as Yup from 'yup';

import formFields from './simulationFormModel';

const {
  formField: { personal, financial, operational, credential },
} = formFields;

export const personalValidation = Yup.object().shape({
  [personal.firstNames.name]: Yup.string().required(personal.firstNames.requiredErrorMsg),
  [personal.lastNames.name]: Yup.string().required(personal.lastNames.requiredErrorMsg),
  [personal.documentType.name]: Yup.string().required(
    personal.documentType.requiredErrorMsg,
  ),
  [personal.documentId.name]: Yup.string()
    .required(personal.documentType.requiredErrorMsg)
    .matches(/^\d+$/, 'Este campo solo puede tener numeros'),
  [personal.dateOfBirth.name]: Yup.date().required(personal.dateOfBirth.requiredErrorMsg),
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
