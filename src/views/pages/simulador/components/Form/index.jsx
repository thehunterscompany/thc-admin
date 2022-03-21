import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { StepperConnector, StepperIcon } from 'src/components/Stepper';
import useWindowSize from 'src/hooks/useWindowSize';
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
        checkedA={values.checkedA}
        checkedB={values.checkedA}
        simulationVal={values.simulation}
      />
    );
  if (step === 1)
    return (
      <FinancialFields
        formField={formField.financial}
        laborTimeVal={values.laborTime}
        tenants={values.tenants}
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
        <div />
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
        <div />
      );
  }
};
const SimulatorForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skip, setSkip] = useState(false);
  const [globalInitialValues, setGlobalInitialValues] = useState(personalValues);
  const [formDirection, setFormDirection] = useState('');
  const [activeSchema, setActiveSchema] = useState(personalValidation);
  const [simulationType, setSimulationType] = useState('');
  const isLastStep = activeStep === steps.length - 1;
  const simulationResult = useSelector((state) => state.PmtSimulationState).simulation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  // useEffect(() => {

  // }, [simulationType])

  const { width } = useWindowSize();
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

  const handleSubmit = async (values, actions) => {
    window.scrollTo(0, 0);

    if (isLastStep) {
      window.open('https://api.whatsapp.com/send?phone=+573104908414', '_blank');
      window.focus();
      window.location.reload();
    } else {
      if (activeStep + 1 === 1) {
        setActiveSchema(financialValidation);
        if (globalInitialValues?.mainEmployment === undefined) {
          handleAddExtra(financialValues);
        }
      }

      if (activeStep + 1 === 2 && values?.simulation === 1) {
        setSchemaOnFormChange(values.simulationType);
        if (globalInitialValues?.value === undefined) {
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
              '9.5%',
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

  const handleBack = (values, actions) => {
    window.scrollTo(0, 0);

    setGlobalInitialValues(values);
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
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  const handleAddExtra = (obj) => {
    setGlobalInitialValues((prevState) => ({
      ...prevState,
      ...obj,
    }));
  };

  const borderOrNot = () => {
    if (skip) {
      return 0;
    }

    if (width <= 900) {
      return 0;
    }

    return 2;
  };

  return (
    <React.Fragment>
      {!skip ? (
        <h1 id="top-point" className="_intro-message">
          Para darte la mejor opción necesitamos algunos datos
        </h1>
      ) : null}
      <Grid
        container
        item
        xs={12}
        sm={11}
        md={9}
        lg={10}
        xl={!skip ? 9 : 10}
        style={{ justifyContent: 'center' }}
      >
        <Paper elevation={borderOrNot()} style={{ minWidth: '72vw' }}>
          <Container
            className={simulationResult && activeStep === 3 ? '_final_results' : ''}
            style={{ minWidth: '250px', padding: '1.5rem' }}
          >
            {activeStep < 3 ? (
              <Stepper
                activeStep={activeStep}
                className={classes.stepper}
                connector={<StepperConnector />}
                alternativeLabel={width >= 600 ? true : false}
                orientation={width >= 600 ? 'horizontal' : 'vertical'}
              >
                {!skip
                  ? steps.slice(0, 3).map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={StepperIcon}>{label}</StepLabel>
                      </Step>
                    ))
                  : null}
              </Stepper>
            ) : null}
            <Formik
              initialValues={globalInitialValues}
              onSubmit={(values, actions) => {
                setGlobalInitialValues(values);

                if (formDirection === 'forward') {
                  if (values.simulation === 1 && values?.realEstateType) {
                    if (simulationType) {
                      if (simulationType !== values.simulationType && activeStep === 0) {
                        values.realEstateType = '';
                        setSimulationType(values.simulationType);
                        setGlobalInitialValues(values);
                      }
                    } else {
                      setSimulationType(values.simulationType);
                    }
                  }
                  handleSubmit(values, actions);
                } else {
                  handleBack(values, actions);
                }
              }}
              validationSchema={activeSchema}
              enableReinitialize
              validateOnMount
            >
              {({ handleChange, isSubmitting, values, setFieldValue, isValid }) => {
                return (
                  <Form onChange={handleChange}>
                    {renderStepForms(activeStep, values, setFieldValue, simulationResult)}
                    <div className="_buttons_space">
                      {[1, 2].includes(activeStep) ||
                      (!simulationResult &&
                        activeStep === 3 &&
                        values?.simulation === 1) ? (
                        <Button
                          type="submit"
                          onClick={(e) => {
                            setFormDirection('backwards');
                            e.target.blur();
                          }}
                          className={'_return_button'}
                        >
                          Regresar
                        </Button>
                      ) : null}
                      <div className={classes.wrapper}>
                        <Button
                          disabled={
                            isSubmitting ||
                            !values.checkedA ||
                            !values.checkedB ||
                            !isValid
                          }
                          type="submit"
                          variant="contained"
                          className={'_continue_button'}
                          onClick={(e) => {
                            setFormDirection('forward');
                            e.target.blur();
                          }}
                        >
                          {isLastStep
                            ? 'Contáctanos'
                            : (values?.simulation === 1 && activeStep === 2) ||
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
          </Container>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default SimulatorForm;
