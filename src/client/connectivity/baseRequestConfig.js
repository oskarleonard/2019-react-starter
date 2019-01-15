function getBaseRequestConfig() {
  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 6000,
  };

  return config;
}

export { getBaseRequestConfig };
