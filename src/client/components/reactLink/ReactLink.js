import React, { PureComponent } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class ReactLink extends PureComponent {
  render() {
    const { className, to, ...rest } = this.props;

    if (to && to.match && to.match(/https*:\/\/\w+.\w+/)) {
      return (
        <a
          className={className}
          href={to}
          target={'_blank'}
          rel="noopener noreferrer"
          {...rest}
        />
      );
    } else {
      const toToJs = to && to.toJS ? to.toJS() : to;

      return (
        <ReactRouterLink className={className} to={toToJs || ''} {...rest} />
      );
    }
  }
}

ReactLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  state: PropTypes.object,
};

export default ReactLink;
