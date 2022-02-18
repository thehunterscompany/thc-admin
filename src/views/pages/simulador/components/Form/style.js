import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  wrapper: {
    margin: `${theme.spacing(1)}px !important`,
    position: 'relative !important',
  },
  buttonProgress: {
    position: 'absolute !important',
    top: '50% !important',
    left: '45% !important',
    color: 'rgb(211, 73, 150) !important',
  },
}));
