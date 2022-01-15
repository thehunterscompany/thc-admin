import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { Button, CircularProgress } from '@material-ui/core';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { Form, Formik } from 'formik';
import { StepperConnector, StepperIcon } from 'src/components/Stepper';
import { lendingSimulation, simulation } from 'src/store/actions';
import * as Yup from 'yup';

import formFields from '../FormModel/simulationFormModel';
import {
  financialValues,
  operationalValues,
  personalValues,
} from '../FormModel/simulationInitialValues';
import {
  commercialValidation,
  financialValidation,
  personalValidation,
  realEstateValidation,
  walletValidation,
} from '../FormModel/validationSchema';
import { Feasible, Lending, NotFeasible } from '../Outcome';

import FinancialFields from './Financial';
import MientrasTanto from './MientrasTanto';
import OperationalFields from './Operation';
import PersonalFields from './Personal';
import useStyles from './style';

const steps = [
  'Datos Personales',
  'Datos Económicos',
  'Datos de la operación',
  'Outcome',
  // 'Register',
];

const { formField } = formFields;
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
        // <CredentialFields
        //   formField={{ email: formField.personal.email, ...formField.credential }}
        //   values={{
        //     email: values.email,
        //     repeatPassword: values.repeatPassword,
        //     password: values.password,
        //   }}
        //   setFieldValue={setFieldValue}
        // />
        <MientrasTanto />
      );
  } else {
    if (step === 3) {
      return <Lending />;
    }

    if (step === 4)
      return (
        // <CredentialFields
        //   formField={{ email: formField.personal.email, ...formField.credential }}
        //   values={{
        //     email: values.email,
        //     repeatPassword: values.repeatPassword,
        //     password: values.password,
        //   }}
        //   setFieldValue={setFieldValue}
        // />
        <MientrasTanto />
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
      window.open('https://api.whatsapp.com/send?phone=+573104908414');
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
        }
        // else if (activeStep === 3) {
        //   handleAddExtra(credentialValues);
        //   setActiveSchema(credentialValidation);
        // }
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
        // } else if (activeStep + 1 === 3) {
        //   handleAddExtra(credentialValues);
        //   setActiveSchema(credentialValidation);
        // }
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

    if (activeStep === 4) {
      setActiveSchema(Yup.object().shape({}));
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
        <CCol xs="8" sm="8" md="8" lg="8" xl={!skip ? '6' : '8'}>
          <CCard className="mx-4" style={!skip ? null : { border: 'none' }}>
            <CCardBody className="p-4">
              <Stepper
                activeStep={activeStep}
                className={classes.stepper}
                connector={<StepperConnector />}
                alternativeLabel
              >
                {!skip
                  ? steps.slice(0, 3).map((label) => (
                      <Step key={label}>
                        <StepLabel
                          StepIconComponent={StepperIcon}
                          className={classes.stepperSvg}
                        >
                          {label}
                        </StepLabel>
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
                // validationSchema={activeSchema}
                enableReinitialize
              >
                {({
                  handleChange,
                  isSubmitting,
                  values,
                  setFieldValue,
                  isValid,
                  touched,
                }) => {
                  // console.log(dirty);

                  return (
                    <Form onChange={handleChange}>
                      {renderStepForms(
                        activeStep,
                        values,
                        setFieldValue,
                        simulationResult,
                      )}
                      <div className={classes.buttons}>
                        {![0, 4].includes(activeStep) && (
                          <Button
                            onClick={() => handleBack(values)}
                            className={classes.button}
                          >
                            Regresar
                          </Button>
                        )}
                        <div className={classes.wrapper}>
                          <Button
                            disabled={
                              isSubmitting || !values.checkedA || !values.checkedB
                            }
                            // disabled={!isValid}
                            // disabled={
                            //   !isValid ||
                            //   (Object.keys(touched).length === 0 &&
                            //     touched.constructor === Object)
                            // }
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.buttonContinue}
                          >
                            {(values?.simulation === 1 && activeStep === 2) ||
                            (values?.simulation === 2 && activeStep === 1)
                              ? 'Simular'
                              : 'Continuar'}
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
