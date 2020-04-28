import React, { useState, useEffect } from 'react';
import CompanyData from '../search/SearchQuoteData';
import SearchBar from '../search/SearchBar';
import PropTypes from 'prop-types';
// import Classes from './Dashboard.module.css';
//redux
import { connect } from 'react-redux';

const capitalize = require('../../utils/capitalize');

const Home = ({ auth: { user } }) => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    let storageCompanyData;
    try {
      storageCompanyData = JSON.parse(localStorage.getItem('companyData'));
    } catch (err) {}

    if (storageCompanyData) {
      setCompanyData([storageCompanyData]);
    }
  }, []);

  return (
    <div data-test='component-home' className='container'>
      <h3>Welcome, {user && capitalize(user.firstName)}</h3>
      <SearchBar
        data-test='component-search-bar'
        setCompanyData={setCompanyData}
      />
      {companyData.map((data, i) => (
        <CompanyData key={i} companyData={data} />
      ))}
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
