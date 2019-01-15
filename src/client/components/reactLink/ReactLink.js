import React, { PureComponent } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class ReactLink extends PureComponent {
  render() {
    const { className, to, state, ...rest } = this.props;

    return (
      <ReactRouterLink
        className={className}
        to={{
          pathname: to || '/',
          state: state,
        }}
        {...rest}
      />
    );
  }
}

ReactLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  state: PropTypes.object,
};

export default ReactLink;
