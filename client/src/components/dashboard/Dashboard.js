import React, { useState } from 'react';
import CompanyData from './CompanyData';
import PropTypes from 'prop-types';
import Classes from './Dashboard.module.css';
// import axios from 'axios';
//redux
import { connect } from 'react-redux';

const fuzzysort = require('fuzzysort');
const symbolsUS = require('../../config/US');
const capitalize = require('../../utils/capitalize');

// todo:
// Split out company data component - done
// split out search bar component
// improve search bar such that search results can be selected using the arrow keys
// improve visually

const Dashboard = ({ auth: { user } }) => {
  const [search, setSearch] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [companyData, setCompanyData] = useState([]);

  const searchCode = e => {
    const searchResults = fuzzysort.go(e.target.value, symbolsUS, {
      keys: ['description', 'symbol'],
      limit: 10,
      threshold: -500
    });
    setSearch(searchResults);
  };

  const selectResult = obj => {
    setCompanyData([obj]);
    setSearchFocus(false);
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
      <h3>Welcome, {user && capitalize(user.firstName)}</h3>
      <div className='row'>
        <div className='card col s12'>
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
      {companyData.map((data, i) => (
        <CompanyData key={i} companyData={data} />
      ))}
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
