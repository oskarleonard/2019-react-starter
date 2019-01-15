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
        responseWithError.response.data
          ? responseWithError.response.data
          : responseWithError &&
            responseWithError.toString &&
            responseWithError.toString();

      console.log('httpRequest ERROR data: ', data);

      const error = new HttpApiCallError(
        responseWithError.statusText,
        responseWithError.status,
        data
      );
      throw error;
    }
  );
}
