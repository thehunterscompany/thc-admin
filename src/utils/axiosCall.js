import axios from 'axios';

import { HOST_URL } from './path';

const axiosCall = async (method, url, data = null, headers = '') => {
  return await axios({
    method,
    url: `${HOST_URL}${url}`,
    data,
    headers: {
      Authorization: headers,
      'Content-Type': 'application/json',
    },
  });
};

export default axiosCall;
