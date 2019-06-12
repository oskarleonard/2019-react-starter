import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class ErrorLoadingChunkReporter extends PureComponent {
  componentDidMount() {
    // TODO: Report error somewhere, maybe GA event and a post to some API

    // Force a Page refresh
    this.props.location.reload();
  }

  render() {
    return null;
  }
}

ErrorLoadingChunkReporter.propTypes = {
  location: PropTypes.object,
};

export default withRouter(ErrorLoadingChunkReporter);
