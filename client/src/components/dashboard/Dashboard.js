import React from 'react';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';

const capitalize = require('../../utils/capitalize');

const Dashboard = ({ auth: { user } }) => {
  return <div>Welcome, {user && capitalize(user.firstName)}</div>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
