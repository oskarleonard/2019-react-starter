import httpRequest from './httpRequest';
import { getBaseRequestConfig, LOCAL_BASE_PATH } from './baseRequestConfig';

export function postLogin(userName, password) {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${LOCAL_BASE_PATH}/login`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
    method: 'POST',
    data: {
      userName: userName,
      password: password,
    },
  });

  return httpRequest(requestConfig);
}

export function getProfile(accessToken) {
  const baseRequestConfig = getBaseRequestConfig(accessToken);
  const url = `${LOCAL_BASE_PATH}/profile`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  console.log('getProfile requestConfig :', requestConfig);

  return httpRequest(requestConfig);
}
