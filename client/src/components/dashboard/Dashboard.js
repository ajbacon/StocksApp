import React, { useState, useEffect } from 'react';
import CompanyData from './CompanyData';
import SearchBar from '../search/SearchBar';
import PropTypes from 'prop-types';
// import Classes from './Dashboard.module.css';
//redux
import { connect } from 'react-redux';

const capitalize = require('../../utils/capitalize');

// todo:
// improve visually

const Dashboard = ({ auth: { user } }) => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const storageCompanyData = JSON.parse(localStorage.getItem('companyData'));

    if (storageCompanyData) {
      setCompanyData([storageCompanyData]);
    }
  }, []);

  return (
    <div data-test='component-dashboard' className='container'>
      <h3>Welcome, {user && capitalize(user.firstName)}</h3>
      <SearchBar setCompanyData={setCompanyData} />
      {companyData.map((data, i) => (
        <CompanyData key={i} companyData={data} />
      ))}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
