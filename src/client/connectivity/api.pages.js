import httpRequest from './httpRequest';
import { getBaseRequestConfig, LOCAL_BASE_PATH } from './baseRequestConfig';

export function fetchPageContent(page) {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${LOCAL_BASE_PATH}${page}`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  return httpRequest(requestConfig);
}
