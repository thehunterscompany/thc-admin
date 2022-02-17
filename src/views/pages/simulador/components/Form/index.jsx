import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CCardBody, CCol } from '@coreui/react';
import { Button, CircularProgress, Paper, Step, StepLabel, Stepper } from '@mui/material';
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
  const [initialValues, setInitialValues] = useState(personalValues);
  const [activeSchema, setActiveSchema] = useState(personalValidation);
  const isLastStep = activeStep === steps.length - 1;
  const simulationResult = useSelector((state) => state.PmtSimulationState).simulation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

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

  const borderOrNot = () => {
    if (skip) {
      return 0;
    }

    if (width <= 760) {
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
      <CCol xs="12" sm="11" md="9" lg="10" xl={!skip ? '9' : '10'}>
        <Paper elevation={borderOrNot()}>
          <CCardBody className="p-4" style={{ minWidth: '250px' }}>
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
                console.log(values);

                return (
                  <Form onChange={handleChange}>
                    {renderStepForms(activeStep, values, setFieldValue, simulationResult)}
                    <div className="_buttons_space">
                      {[1, 2].includes(activeStep) ||
                      (!simulationResult &&
                        activeStep === 3 &&
                        values?.simulation === 1) ? (
                        <Button
                          onClick={() => handleBack(values)}
                          className={'_return_button'}
                        >
                          Regresar
                        </Button>
                      ) : null}
                      <div className={classes.wrapper}>
                        <Button
                          disabled={isSubmitting || !values.checkedA || !values.checkedB}
                          // disabled={!isValid}
                          // disabled={
                          //   !isValid ||
                          //   (Object.keys(touched).length === 0 &&
                          //     touched.constructor === Object)
                          // }
                          type="submit"
                          variant="contained"
                          className={'_continue_button'}
                          onClick={(e) => e.target.blur()}
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
          </CCardBody>
        </Paper>
      </CCol>
      {/* </Container> */}
      {/* </CRow> */}
    </React.Fragment>
  );
};

export default SimulatorForm;
