import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Classes from './Dashboard.module.css';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { disconnect } from 'mongoose';

const fuzzysort = require('fuzzysort');
const symbolsUS = require('../../config/US');
const capitalize = require('../../utils/capitalize');

// todo:
// Split up into multiple components
// change to async await?
// improve search bar such that search results can be selected using the arrow keys
// improve visually

const Dashboard = ({ auth: { user } }) => {
  const [search, setSearch] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState([]);

  const searchCode = e => {
    const searchResults = fuzzysort.go(e.target.value, symbolsUS, {
      keys: ['description', 'symbol'],
      limit: 10,
      threshold: -500
    });
    setSearch(searchResults);
    console.log(searchResults);
  };

  const selectResult = obj => {
    let companyCode = obj.symbol;
    console.log(companyCode);
    let url = `https://finnhub.io/api/v1/quote?symbol=${companyCode}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSearchFocus(false);
        setCompanyData([obj]);
        setCurrentQuote([data]);
      });

    // try {
    //   let response = await fetch(url);
    //   let data = await response.json().then(data => {};
    //   console.log(obj);
    //   setSearchData({
    //     ...searchData,
    //     companyData: obj,
    //     currentQuote: [data],
    //     searchFocus: false
    //   });
    //   console.log(data);
    //   console.log(searchData.currentQuote);
    // } catch {
    //   setSearchData({
    //     ...searchData,
    //     companyData: [],
    //     currentQuote: [],
    //     searchFocus: false
    //   });
    //   console.log('here');
    // }
  };

  const searchList = () => {
    return search.map((item, i) => {
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
    setSearchFocus(true);
  };

  const onSearchBlur = () => {
    setTimeout(() => {
      setSearchFocus(false);
    }, 200);
  };

  return (
    <div>
      <h3>
        Welcome,{' '}
        {user &&
          `${capitalize(user.firstName)}${
            capitalize(user.firstName) === 'Niel' ? ' (poes)' : ''
          }`}
      </h3>
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
                className={`${Classes.searchResult} ${!searchFocus &&
                  Classes.hideElement}`}
              >
                {searchList()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4>{companyData.length > 0 ? companyData[0].description : ''}</h4>
      <div>
        {currentQuote.length > 0 ? `Current Price: ${currentQuote[0].c}` : ''}
      </div>
      <div>
        {currentQuote.length > 0
          ? `Day Opening Price: ${currentQuote[0].o}`
          : ''}
      </div>
      <div>
        {currentQuote.length > 0 ? `Day High Price: ${currentQuote[0].h}` : ''}
      </div>
      <div>
        {currentQuote.length > 0 ? `Day Low Price: ${currentQuote[0].l}` : ''}
      </div>
      <div>
        {currentQuote.length > 0
          ? `Previous Closing Price: ${currentQuote[0].pc}`
          : ''}
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
