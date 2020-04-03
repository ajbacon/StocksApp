import React, { useState } from 'react';
import CompanyData from './CompanyData';
import SearchBar from '../search/SearchBar';
import PropTypes from 'prop-types';
// import Classes from './Dashboard.module.css';
// import axios from 'axios';
//redux
import { connect } from 'react-redux';

const capitalize = require('../../utils/capitalize');

// todo:
// Split out company data component - done
// split out search bar component
// improve search bar such that search results can be selected using the arrow keys
// improve visually

const Dashboard = ({ auth: { user } }) => {
  const [companyData, setCompanyData] = useState([]);

  return (
    <div>
      <h3>Welcome, {user && capitalize(user.firstName)}</h3>
      <SearchBar setCompanyData={setCompanyData} />
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
