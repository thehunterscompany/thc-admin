import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContinue: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: 'rgb(211, 73, 150)',
    '&:hover': {
      backgroundColor: 'rgb(211, 73, 150, 0.8)',
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));
