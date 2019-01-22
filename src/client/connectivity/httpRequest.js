import axios from 'axios';
import HttpApiCallError from './HttpApiCallError';

export default function httpRequest(requestConfig = {}) {
  console.log('httpRequest START requestConfig');
  return axios(requestConfig).then(
    (response) => {
      console.log('httpRequest response');
      return response;
    },
    (responseWithError) => {
      const data =
        responseWithError &&
        responseWithError.response &&
        responseWithError.response.data;
      const message = responseWithError.statusText || data;
      const status = responseWithError.status;

      const error = new HttpApiCallError(message, status, data);
      throw error;
    }
  );
}
