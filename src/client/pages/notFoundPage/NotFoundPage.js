import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GenericHelmet from '@client/helperComponents/genericHelmet/GenericHelmet';
import {
  loadNotFoundPageContent,
  selectText,
  selectHelmetData,
} from './duckNotFoundPage';

class NotFoundPage extends PureComponent {
  static loadData(dispatch) {
    return dispatch(loadNotFoundPageContent());
  }

  componentDidMount() {
    NotFoundPage.loadData(this.props.dispatch);
  }

  render() {
    const { text, helmetData } = this.props;

    return (
      <div>
        <p>{text} </p>
        <GenericHelmet helmetData={helmetData} />
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  dispatch: PropTypes.func,
  text: PropTypes.string,
  helmetData: ImmutablePropTypes.map,
};

function mapStateToProps(state) {
  return {
    text: selectText(state),
    helmetData: selectHelmetData(state),
  };
}

export default connect(mapStateToProps)(NotFoundPage);
