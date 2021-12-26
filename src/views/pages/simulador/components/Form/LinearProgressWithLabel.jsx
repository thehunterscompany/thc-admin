import * as React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '78%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`
Contraseña es fuerte
        `}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel() {
  //   const [progress, setProgress] = React.useState(100);

  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //     }, 800);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={10} />
    </Box>
  );
}
