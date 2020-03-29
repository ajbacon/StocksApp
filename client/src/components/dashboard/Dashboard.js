import React from 'react';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';

const capitalize = require('../../utils/capitalize');

const Dashboard = ({ auth: { user } }) => {
  return (
    <div>
      <div>Welcome, {user && capitalize(user.firstName)}</div>
      <div className='center row '>
        <div className='card col s6'>
          <div>
            <div className='nav-wrapper'>
              <div className='input-field'>
                <input
                  id='search'
                  type='search'
                  placeholder='search...'
                  required
                />
                <label className='label-icon' htmlFor='search'>
                  <i className='material-icons'>search</i>
                </label>
                <i className='material-icons'>close</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
