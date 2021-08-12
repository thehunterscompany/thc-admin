import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { simulation } from 'src/store/actions';

import formFields from '../FormModel/simulationFormModel';
import { Feasible, Lending, NotFeasible } from '../Outcome';

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
const renderStepForms = (step, values, setFieldValue, simulation) => {
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

  if (step === 3 && simulation) return <Feasible values={values} />;

  if (step === 3 && !simulation) return <NotFeasible />;
};
const SimulatorForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skip, setSkip] = useState(false);
  const isLastStep = activeStep === steps.length - 1;

  const simulationResult = useSelector(
    (state) => state.PmtSimulationState,
  ).simulation;

  console.log(simulationResult);

  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      // _submitForm(values, actions);
      console.log('hi');
    } else {
      if (activeStep + 1 === 2 && values?.simulation === 2) {
        setSkip(true);
      } else if (activeStep + 1 === 3 && values?.simulation === 1) {
        dispatch(
          simulation(
            values.value,
            values.time,
            '8.5%',
            values.earnings,
            values.tenants,
          ),
        );
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
      {!skip ? (
        <h1>Para darte la mejor opción necesitamos algunos datos</h1>
      ) : null}
      <CRow className="justify-content-center">
        <CCol xs="8" sm="8" md="8" lg="8" xl="6">
          <CCard className="mx-4" style={!skip ? null : { border: 'none' }}>
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
                      {renderStepForms(
                        activeStep,
                        values,
                        setFieldValue,
                        simulationResult,
                      )}
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
