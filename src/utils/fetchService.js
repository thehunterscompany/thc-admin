import { call } from 'redux-saga/effects'
import { HOST_URL } from './path'
import axios from 'axios'

function* axiosGenerator(url, method = 'GET', data = null, headers = '') {
  const objectRequest = {
    method,
    url: `${HOST_URL}${url}`,
    data,
    headers: {
      Authorization: headers,
      'Content-Type': 'application/json',
    },
  }

  const response = yield call(axios, objectRequest)

  const responseBody = response.data

  return responseBody
}

export default axiosGenerator
