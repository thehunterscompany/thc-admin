import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import { Form, Formik } from 'formik';

import formFields from '../FormModel/simulationFormModel';
import { Lending } from '../Outcome';

import FinancialFields from './Financial';
import OperationalFields from './Operacion';
import PersonalFields from './Personal';
import useStyles from './style';

const steps = [
  'Datos Personales',
  'Datos Económicos',
  'Datos de la operación',
  'Outcome',
  'Register',
];

const { formId, formField } = formFields;
const renderStepForms = (step, values, setFieldValue) => {
  if (step === 0)
    return (
      <PersonalFields
        formField={formField.personal}
        values={values}
        setFieldValue={setFieldValue}
      />
    );
  if (step === 1)
    return (
      <FinancialFields
        formField={formField.financial}
        values={values}
        setFieldValue={setFieldValue}
      />
    );
  if (step === 2 && values?.simulation === 2) {
    return <Lending income={values.earnings} tenants={values.tenants} />;
  }
  if (step === 2)
    return (
      <OperationalFields formField={formField.operational} values={values} />
    );
  // case 2:
  //   return <OperationalFields formField={formField.operational} values={values} />
  // case 3:
  //   return null
};
const SimulatorForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skip, setSkip] = useState(false);
  const isLastStep = activeStep === steps.length - 1;

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      // _submitForm(values, actions);
      console.log('hi');
    } else {
      if (activeStep + 1 === 2 && values?.simulation === 2) {
        setSkip(true);
      }
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = () => {
    setSkip(false);
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      {activeStep < 2 ? (
        <h1>Para darte la mejor opción necesitamos algunos datos</h1>
      ) : null}
      <CRow className="justify-content-center">
        <CCol xs="8" sm="8" md="8" lg="8" xl="6">
          <CCard
            className="mx-4"
            style={activeStep < 2 ? null : { border: 'none' }}
          >
            <CCardBody className="p-4">
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                className={classes.stepper}
              >
                {!skip
                  ? steps.slice(0, 3).map((label) => (
                      <Step key={label}>
                        <StepLabel className={classes.svg}>{label}</StepLabel>
                      </Step>
                    ))
                  : null}
              </Stepper>
              <Formik
                initialValues={{
                  checkedA: false,
                  checkedB: false,
                  dateOfBirth: '',
                  tenants: [],
                  country: { name: '', code: '', phone: '', currencyCode: '' },
                  earnings: '',
                  laborTime: '',
                  time: '',
                }}
                onSubmit={(values, actions) => {
                  // props.postParams(values, resetForm)
                  handleSubmit(values, actions);
                }}
                validationSchema={''}
              >
                {({ handleChange, isSubmitting, values, setFieldValue }) => {
                  console.log(values);

                  return (
                    <Form onChange={handleChange} id={formId}>
                      {renderStepForms(activeStep, values, setFieldValue)}
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Regresar
                          </Button>
                        )}
                        <div className={classes.wrapper}>
                          <Button
                            // disabled={
                            //   isSubmitting || !values.checkedA || !values.checkedB
                            // }
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            {isLastStep ? 'Simular' : 'Continuar'}
                          </Button>
                          {isSubmitting && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default SimulatorForm;
