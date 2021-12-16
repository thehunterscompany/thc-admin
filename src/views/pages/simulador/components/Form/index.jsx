import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { Button, CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { lendingSimulation, simulation } from 'src/store/actions';

import formFields from '../FormModel/simulationFormModel';
import {
  credentialValues,
  financialValues,
  operationalValues,
  personalValues,
} from '../FormModel/simulationInitialValues';
import {
  commercialValidation,
  credentialValidation,
  financialValidation,
  personalValidation,
  realEstateValidation,
  walletValidation,
} from '../FormModel/validationSchema';
import { Feasible, Lending, NotFeasible } from '../Outcome';

import CredentialFields from './Credentials';
import FinancialFields from './Financial';
import OperationalFields from './Operation';
import PersonalFields from './Personal';
import useStyles from './style';

const steps = [
  'Datos Personales',
  'Datos Económicos',
  'Datos de la operación',
  'Outcome',
  'Register',
];

const { formField } = formFields;
const renderStepForms = (step, values, setFieldValue, simulation) => {
  if (step === 0)
    return (
      <PersonalFields
        formField={formField.personal}
        values={{
          simulation: values.simulation,
          checkedA: values.checkedA,
          checkedB: values.checkedB,
          telephone: values.telephone,
        }}
        setFieldValue={setFieldValue}
      />
    );
  if (step === 1)
    return (
      <FinancialFields
        formField={formField.financial}
        values={{
          tenants: values.tenants,
          earnings: values.earnings,
          passive: values.passive,
          laborTime: values.laborTime,
        }}
        setFieldValue={setFieldValue}
      />
    );

  if (values?.simulation === 1) {
    if (step === 2)
      return (
        <OperationalFields
          formField={formField.operational}
          setFieldValue={setFieldValue}
          values={values}
        />
      );

    if (step === 3 && simulation) return <Feasible values={values} />;

    if (step === 3 && !simulation) return <NotFeasible />;

    if (step === 4)
      return (
        <CredentialFields
          formField={{ email: formField.personal.email, ...formField.credential }}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
  } else {
    if (step === 3) {
      return <Lending />;
    }

    if (step === 4)
      return (
        <CredentialFields
          formField={{ email: formField.personal.email, ...formField.credential }}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
  }
};
const SimulatorForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skip, setSkip] = useState(false);
  const [initialValues, setInitialValues] = useState(personalValues);
  const [activeSchema, setActiveSchema] = useState(personalValidation);
  const isLastStep = activeStep === steps.length;
  const simulationResult = useSelector((state) => state.PmtSimulationState).simulation;

  const dispatch = useDispatch();

  const setSchemaOnFormChange = (simulationType) => {
    if (simulationType === 1) {
      setActiveSchema(realEstateValidation);
    } else if (simulationType === 2) {
      setActiveSchema(commercialValidation);
    } else {
      setActiveSchema(walletValidation);
    }
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      // _submitForm(values, actions);
    } else {
      if (activeStep + 1 === 1) {
        setActiveSchema(financialValidation);
        if (initialValues?.mainEmployment === undefined) {
          handleAddExtra(financialValues);
        }
      }

      if (activeStep + 1 === 2 && values?.simulation === 1) {
        setSchemaOnFormChange(values.simulationType);
        if (initialValues?.value === undefined) {
          const { value, currentDeal, time } = operationalValues;
          const obj = { value, currentDeal, time };
          if (values.simulationType === 1) {
            handleAddExtra({ ...obj, ...operationalValues.realEstate });
          } else if (values.simulationType === 2) {
            handleAddExtra({ ...obj, ...operationalValues.commercial });
          } else {
            handleAddExtra({ ...obj, ...operationalValues.wallet });
          }
        }
      }

      if (values?.simulation === 2) {
        if (activeStep + 1 === 2) {
          setSkip(true);
          dispatch(lendingSimulation(values.earnings, values.tenants, '8.5%'));
        } else if (activeStep + 1 === 3) {
          handleAddExtra(credentialValues);
          setActiveSchema(credentialValidation);
        }
      } else {
        if (activeStep + 1 === 3) {
          dispatch(
            simulation(
              values.currentDeal,
              values.time,
              '8.5%',
              values.earnings,
              values.tenants,
            ),
          );
          setSkip(true);
        }
      }

      setActiveStep(
        activeStep + 1 === 2 && values?.simulation === 2
          ? activeStep + 2
          : activeStep + 1,
      );
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = (values) => {
    setInitialValues(values);
    setSkip(activeStep - 1 === 3 ? true : false);

    setActiveStep(
      activeStep === 3 && values?.simulation === 2 ? activeStep - 2 : activeStep - 1,
    );

    if (activeStep === 1) {
      setActiveSchema(personalValidation);
    } else if (activeStep === 2 || activeStep - 1 === 2) {
      setActiveSchema(financialValidation);
    } else if (activeStep === 3 && values?.simulation === 2) {
      setSchemaOnFormChange(values.simulationType);
    }
  };

  const handleAddExtra = (obj) => {
    setInitialValues((prevState) => ({
      ...prevState,
      ...obj,
    }));
  };
  return (
    <React.Fragment>
      {!skip ? <h1>Para darte la mejor opción necesitamos algunos datos</h1> : null}
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
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  setInitialValues(values);
                  handleSubmit(values, actions);
                }}
                validationSchema={activeSchema}
                enableReinitialize
              >
                {({ handleChange, isSubmitting, values, setFieldValue }) => {
                  console.log(values);

                  return (
                    <Form onChange={handleChange}>
                      {renderStepForms(
                        activeStep,
                        values,
                        setFieldValue,
                        simulationResult,
                      )}
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button
                            onClick={() => handleBack(values)}
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
