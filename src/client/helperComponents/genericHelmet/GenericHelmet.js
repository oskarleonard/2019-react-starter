import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { getIn } from '@client/shared/utils/immutableUtils/immutableUtils';

/*
 * Should be called when title, meta tags, etc... have to be updated according to received JSON data.
 */
class GenericHelmet extends PureComponent {
  render() {
    const { helmetData } = this.props;

    const meta = getIn(helmetData, 'meta');

    return (
      <Helmet
        title={getIn(helmetData, 'title') || 'React Starter'}
        meta={meta && meta.toJS && meta.toJS()}
      />
    );
  }
}

GenericHelmet.propTypes = {
  helmetData: ImmutablePropTypes.mapContains({
    title: PropTypes.string,
    meta: ImmutablePropTypes.list,
  }),
};

export default withRouter(GenericHelmet);
