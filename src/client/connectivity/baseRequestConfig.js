function getBaseRequestConfig(accessToken) {
  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 6000,
  };

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

const LOCAL_BASE_PATH =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/mockApi`
    : `http://localhost:3000/mockApi`; // `http://localhost:3000/mockApi`

export { getBaseRequestConfig, LOCAL_BASE_PATH };
