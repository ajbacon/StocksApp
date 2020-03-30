import React from 'react';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';

const fuzzysort = require('fuzzysort');
const symbolsUS = require('../../config/US');
const capitalize = require('../../utils/capitalize');

const Dashboard = ({ auth: { user } }) => {
  const searchCode = e => {
    const results = fuzzysort.go(e.target.value, symbolsUS, {
      key: 'symbol',
      limit: 10
    });
    console.log(results);
  };
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
                  onChange={e => searchCode(e)}
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
