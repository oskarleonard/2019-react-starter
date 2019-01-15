/* eslint-disable */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const APPLICATION_JSON = 'application/json';
const DEFAULT_ACCEPT_HEADER = APPLICATION_JSON;

const getOptions = () => {
  return {
    headers: {
      Accept: DEFAULT_ACCEPT_HEADER,
      'Content-Type': APPLICATION_JSON,
    },
  };
};

const postJsonRequest = (url, data, options = null) => {
  return axios.post(url, data, options ? options : getOptions());
};

class ErrorLoadingChunkReporter extends PureComponent {
  componentDidMount() {
    const path = this.props.location.pathname;

    // ReactGA.event({
    //   category: 'Errors',
    //   action: 'Error-Loading-Chunk',
    //   label: path,
    // });
    //
    // postJsonRequest('/client-error', {
    //   countryCode: 'se',
    //   error: 'Error Loading Chunk',
    //   label: 'error-loading-chunk',
    //   path: path,
    // });
  }

  render() {
    return null;
  }
}

ErrorLoadingChunkReporter.propTypes = {
  location: PropTypes.object,
};

/* eslint-enable */

export default withRouter(ErrorLoadingChunkReporter);
