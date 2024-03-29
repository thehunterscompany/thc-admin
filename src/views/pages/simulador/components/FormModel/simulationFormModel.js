const formFields = {
  formId: 'simulationForm',
  formField: {
    personal: {
      firstNames: {
        name: 'firstNames',
        label: 'Nombres',
        requiredErrorMsg: 'Este campo es requerido',
      },
      lastNames: {
        name: 'lastNames',
        label: 'Apellidos',
        requiredErrorMsg: 'Este campo es requerido',
      },
      documentType: {
        name: 'documentType',
        label: 'Tipo de Documento',
        requiredErrorMsg: 'Este campo es requerido',
      },
      documentId: {
        name: 'documentId',
        label: 'Número de Documento',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'Este campo solo puede tener numeros',
      },
      dateOfBirth: {
        name: 'dateOfBirth',
        label: 'Fecha de Nacimiento',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'La fecha ingresada no es válida',
      },
      email: {
        name: 'email',
        label: 'Correo Electrónico',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'El correo ingresado no es válido',
      },
      state: {
        name: 'state',
        label: '¿En qué departamento vives?',
        requiredErrorMsg: 'Este campo es requerido',
      },
      city: {
        name: 'city',
        label: '¿En qué ciudad vives? ',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'La ciudad ingresada no es válida',
      },
      location: {
        name: 'location',
        label: '¿En qué ciudad vives? ',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'La ciudad ingresada no es válida',
      },
      telephone: {
        name: 'telephone',
        label: 'Teléfono',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'El número ingresado no es válido',
      },
      simulation: {
        name: 'simulation',
        label: '¿Qué Necesitas?',
        requiredErrorMsg: 'Este campo es requerido',
      },
      simulationType: {
        name: 'simulationType',
        label: 'Tipo de Cuota',
        requiredErrorMsg: 'Este campo es requerido',
      },
    },
    financial: {
      mainEmployment: {
        name: 'mainEmployment',
        label: 'Actividad Laboral Principal',
        requiredErrorMsg: 'Este campo es requerido',
      },
      laborTime: {
        name: 'laborTime',
        label: 'Antigúedad Laboral',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: '¡Solo pueden ser números!',
      },
      earnings: {
        name: 'earnings',
        label: 'Ingresos Mensuales',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'Solo ingresa numeros',
      },
      passive: {
        name: 'passive',
        label: '¿Cuál es el valor de las cuotas mensuales que pagas a los bancos?',
        requiredErrorMsg: 'Este campo es requerido',
      },
      tenants: {
        name: 'tenants',
      },
    },
    operational: {
      value: {
        name: 'value',
        label: 'Valor de la Vivienda',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'Solo ingresa numeros',
      },
      currentDeal: {
        name: 'currentDeal',
        label: 'Valor a Financiar',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'El máximo porcentaje de financiación es de 85%',
      },
      time: {
        name: 'time',
        label: 'Plazo',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'Solo puede contener números!',
        invalidErrorMsg1: 'El plazo mínimo es de 5 años y el máximo de 20 años',
      },
      type: {
        name: 'type',
        label: 'Linea de Financiación',
        requiredErrorMsg: 'Este campo es requerido',
      },

      realEstate: {
        realEstateType: {
          name: 'realEstateType',
          label: 'Tipo de Vivienda',
          requiredErrorMsg: 'Este campo es requerido',
        },
      },
      commercial: {
        value: {
          name: 'value',
          label: 'Valor del Inmueble',
          requiredErrorMsg: 'Este campo es requerido',
          invalidErrorMsg: 'Solo ingresa numeros',
        },
        realEstateType: {
          name: 'realEstateType',
          label: 'Tipo de Inmueble',
          requiredErrorMsg: 'Este campo es requerido',
        },
      },
      wallet: {
        currentDealMonth: {
          name: 'currentDealMonth',
          label: 'Valor de la cuota mensual',
          requiredErrorMsg: 'Este campo es requerido',
          invalidErrorMsg: 'Solo ingresa numeros',
        },
        institution: {
          name: 'institution',
          label: 'Entidad Financiera',
          requiredErrorMsg: 'Este campo es requerido',
        },
        rates: {
          name: 'rates',
          label: 'Tasa',
          requiredErrorMsg: 'Este campo es requerido',
        },
      },
    },
    credential: {
      password: {
        name: 'password',
        label: 'Contraseña',
        requiredErrorMsg: 'Este campo es requerido',
        invalidErrorMsg: 'La contraseña tiene que tener como mínimo 8 caracteres',
        invalidErrorMsg1: '¡La contraseña es invalida! Por favor revisar las reglas!',
      },
      repeatPassword: {
        name: 'repeatPassword',
        label: 'Repite la contraseña',
        invalidErrorMsg: 'Las contraseñas no son las mismas',
      },
    },
  },
};

export default formFields;
