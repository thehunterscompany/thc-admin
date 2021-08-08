import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from '@material-ui/core';
import FinancialFields from './Financial';
import PersonalFields from './Personal';
import OperationalFields from './Operación';

import useStyles from './style';
import formFields from '../FormModel/simulationFormModel';

const steps = ['Datos Personales', 'Datos Económicos', 'Datos de la operación'];

const renderStepForms = (step, values) => {
  if (step === 0)
    return <PersonalFields formField={formField.personal} values={values} />;
  if (step === 1)
    return <FinancialFields formField={formField.financial} values={values} />;
  if (step === 2 && values?.simulation === 2) return null;
  if (step === 2)
    return (
      <OperationalFields formField={formField.operational} values={values} />
    );
  // case 2:
  //   return <OperationalFields formField={formField.operational} values={values} />
  // case 3:
  //   return null
};

const { formId, formField } = formFields;

const SimulatorForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      // _submitForm(values, actions);
      console.log('hi');
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className={classes.svg}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        <Formik
          initialValues={{
            checkedA: false,
            checkedB: false,
            dateOfBirth: '',
            tenants: [],
          }}
          onSubmit={(values, actions) => {
            // props.postParams(values, resetForm)
            _handleSubmit(values, actions);
          }}
          validationSchema={''}
        >
          {({ handleChange, isSubmitting, values }) => {
            console.log(values);
            return (
              <Form onChange={handleChange} id={formId}>
                {renderStepForms(activeStep, values)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Regresar
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={
                        isSubmitting || !values.checkedA || !values.checkedB
                      }
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
      </>
    </React.Fragment>
  );
};

export default SimulatorForm;