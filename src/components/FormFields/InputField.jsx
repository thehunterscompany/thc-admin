import React from 'react';
import { TextField } from '@material-ui/core';
// import { styled } from '@mui/material/styles';
import { useField } from 'formik';
import { at } from 'lodash';

// const CustomStyleTextField = styled(TextField)({
//   '& label.Mui-focused': {
//     color: 'rgb(211, 73, 150)',
//   },
//   '& .MuiFilledInput-underline:after': {
//     borderBottomColor: 'rgb(211, 73, 150)',
//   },
// });

const InputField = (props) => {
  // eslint-disable-next-line react/prop-types
  const { errorText, type, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type={type}
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      variant="filled"
      margin="normal"
      {...field}
      {...rest}
    />
  );
};

export default React.memo(InputField);
