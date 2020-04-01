import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Classes from './Dashboard.module.css';
import axios from 'axios';
//redux
import { connect } from 'react-redux';

const fuzzysort = require('fuzzysort');
const symbolsUS = require('../../config/US');
const capitalize = require('../../utils/capitalize');

const Dashboard = ({ auth: { user } }) => {
  const [searchData, setSearchData] = useState({
    search: [],
    searchFocus: false,
    companyData: [],
    currentQuote: []
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

  const selectResult = async obj => {
    let companyCode = obj.symbol;
    let url = `https://finnhub.io/api/v1/quote?symbol=${companyCode}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
  };

  const searchList = () => {
    return searchData.search.map((item, i) => {
      return (
        <div
          className={Classes.resultItem}
          onClick={() => selectResult(item.obj)}
          key={i}
        >
          {item.obj.description}
        </div>
      );
    });
  };

  const onSearchFocus = () => {
    setSearchData({ ...searchData, searchFocus: true });
  };

  const onSearchBlur = () => {
    setTimeout(() => {
      setSearchData({ ...searchData, searchFocus: false });
    }, 200);
  };

  return (
    <div>
      <div>
        Welcome,{' '}
        {user &&
          `${capitalize(user.firstName)}${
            capitalize(user.firstName) === 'Niel' ? ' (poes)' : ''
          }`}
      </div>
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
              <div
                className={`${Classes.searchResult} ${!searchData.searchFocus &&
                  Classes.hideElement}`}
              >
                {searchList()}
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
