import React from 'react';

const LazyLoadContext = React.createContext({
  injectReducer: () => {},
});

export default LazyLoadContext;
