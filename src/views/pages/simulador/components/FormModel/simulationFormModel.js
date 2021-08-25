const formFields = {
  formId: 'simulationForm',
  formField: {
    personal: {
      firstNames: {
        name: 'firstNames',
        label: 'Nombres',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      lastNames: {
        name: 'lastNames',
        label: 'Apellidos',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      documentType: {
        name: 'documentType',
        label: 'Tipo de Documento',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      documentId: {
        name: 'documentId',
        label: 'Número de Documento',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      dateOfBirth: {
        name: 'dateOfBirth',
        label: 'Fecha de Nacimiento',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'La fecha es invalida',
      },
      email: {
        name: 'email',
        label: 'Correo Electrónico',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'El correo ingresado es incorrecto',
      },
      country: {
        name: 'country',
        label: 'En que país vives? ',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      telephone: {
        name: 'telephone',
        label: 'Teléfono',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'Numero de teléfono no puede ser mas de 15 digitos',
      },
      simulation: {
        name: 'simulation',
        label: 'Que Necesitas?',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      simulationType: {
        name: 'simulationType',
        label: 'Tipo de Cuota',
        requiredErrorMsg: 'Este campo es requerido.',
      },
    },
    financial: {
      mainEmployment: {
        name: 'mainEmployment',
        label: 'Actividad Laboral Principal',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      laborTime: {
        name: 'laborTime',
        label: 'Actividad Laboral',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      earnings: {
        name: 'earnings',
        label: 'Ingresos Mensuales',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'Solo ingresa numeros.',
      },
      passive: {
        name: 'passive',
        label: 'Cuotas mensuales de préstamos y tarjetas de crédito?',
        requiredErrorMsg: 'Este campo es requerido.',
      },
      tenants: {
        name: 'tenants',
      },
    },
    operational: {
      value: {
        name: 'value',
        label: 'Valor de la vivienda',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'Solo ingresa numeros.',
      },
      currentDeal: {
        name: 'currentDeal',
        label: 'Valor a Financiar',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'El máximo porcentaje de financiación es de 85%',
      },
      time: {
        name: 'time',
        label: 'Plazo',
        requiredErrorMsg: 'Este campo es requerido.',
        invalidErrorMsg: 'El plazo minímo es a 5 año y el máximo a 20 años',
      },

      realEstate: {
        type: {
          name: 'type',
          label: 'Linea de financiación',
          requiredErrorMsg: 'Este campo es requerido.',
        },
        realEstateType: {
          name: 'realEstateType',
          label: 'Tipo de vivienda',
          requiredErrorMsg: 'Este campo es requerido.',
        },
      },
      commercial: {
        realEstateType: {
          name: 'realEstateType',
          label: 'Tipo de inmueble',
          requiredErrorMsg: 'Este campo es requerido.',
        },
      },
      wallet: {
        currentDealMonth: {
          name: 'currentDealMonth',
          label: 'Valor de la cuota mensual',
          requiredErrorMsg: 'Este campo es requerido.',
          invalidErrorMsg: 'Solo ingresa numeros.',
        },
        institution: {
          name: 'institution',
          label: 'Entidad Financiera',
          requiredErrorMsg: 'Este campo es requerido.',
        },
        rates: {
          name: 'rates',
          label: 'Tasa',
          requiredErrorMsg: 'Este campo es requerido.',
        },
      },
    },
  },
};

export default formFields;
