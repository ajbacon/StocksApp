import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length) {
    let output = alerts.map(alert => <div key={alert.id}>{alert.msg}</div>);
    return output;
  }
  return null;
};

// const Alert = ({ alerts }) =>
//   alerts !== null &&
//   alerts.length > 0 &&
//   alerts.map(alert => <div key={alert.id}>{alert.msg}</div>);

Alert.propTypes = {
  alerts: PropTypes.array
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
