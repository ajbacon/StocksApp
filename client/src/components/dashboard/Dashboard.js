import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Classes from './Dashboard.module.css';

//redux
import { connect } from 'react-redux';

const fuzzysort = require('fuzzysort');
const symbolsUS = require('../../config/US');
const capitalize = require('../../utils/capitalize');

const Dashboard = ({ auth: { user } }) => {
  const [searchData, setSearchData] = useState({
    search: [],
    searchFocus: false
  });

  const searchCode = e => {
    const results = fuzzysort.go(e.target.value, symbolsUS, {
      keys: ['description', 'symbol'],
      limit: 10,
      threshold: -500
    });
    setSearchData({ ...searchData, search: results });
    console.log(results);
  };

  const searchList = () => {
    return searchData.search.map((item, i) => {
      return <div key={i}>{item.obj.description}</div>;
    });
  };

  const onSearchFocus = () => {
    setSearchData({ ...searchData, searchFocus: true });
  };

  const onSearchBlur = () => {
    setSearchData({ ...searchData, searchFocus: false });
  };

  const hideResults = () => {
    return `${Classes.searchResult}`;
  };

  return (
    <div>
      <div>Welcome, {user && capitalize(user.firstName)}</div>
      <div className='row'>
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
                  onFocus={() => onSearchFocus()}
                  onBlur={() => onSearchBlur()}
                  autoComplete='off'
                />
                <label className='label-icon' htmlFor='search'>
                  <i className='material-icons'>search</i>
                </label>
                <i className='material-icons'>close</i>
              </div>
              <div className={() => hideResults()}>{searchList()}</div>
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
