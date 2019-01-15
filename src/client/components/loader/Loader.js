import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function Loader({ className }) {
  return (
    <div className={styles.loader}>
      <div
        className={`${styles.loaderContent}${className ? ` ${className}` : ''}`}
      >
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
