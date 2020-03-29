import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

//redux
import { connect } from 'react-redux';

const capitalize = require('../../utils/capitalize');

const Dashboard = ({ auth: { user } }) => {
  searchApiAV = e => {
    const AV_KEY = config('ALPHA_VANTAGE_API');
    console.log(AV_KEY);
    console.log(e.target.value);
    let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${AV_KEY}`;

    axios
      .get(url)
      .then(res => {
        this.setState({
          searchItems: []
        });
        console.log(res.data.bestMatches[0]);
      })
      .catch(err => {
        console.log(err);
      });
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
                  onChange={this.searchApiAV}
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
