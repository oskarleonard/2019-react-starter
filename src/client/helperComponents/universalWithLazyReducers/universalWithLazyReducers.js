import React from 'react';
import universal from 'react-universal-component';
import LazyLoadContext from '@client/helperComponents/context/LazyLoadContext';

const baseOptions = {
  loadingTransition: false,
  loading: () => {
    return null;
  },
  onLoad: (module, { isServer }, props) => {
    if (!isServer) {
      if (module.reducer && props.injectReducer) {
        props.injectReducer(module.reducer.name, module.reducer.reducer);
      }
      if (module.reducers && props.injectReducer) {
        module.reducers.forEach((reducer) =>
          props.injectReducer(reducer.name, reducer.reducer)
        );
      }
    }
  },
};

export default function universalWithLazyReducers(importPromise, options) {
  const UniversalComponent = universal(importPromise, {
    ...baseOptions,
    ...options,
  });

  function LazyLoadComponent(props) {
    return (
      <LazyLoadContext.Consumer>
        {({ injectReducer }) => {
          return (
            <UniversalComponent {...props} injectReducer={injectReducer} />
          );
        }}
      </LazyLoadContext.Consumer>
    );
  }

  // We do this so we can call for example .preload
  // directly on the LazyLoadComponent
  LazyLoadComponent.preload = UniversalComponent.preload;
  LazyLoadComponent.preloadWeak = UniversalComponent.preloadWeak;

  return LazyLoadComponent;
}
