import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout }) => {
  const { isAuthenticated, loading } = auth;
  const authLinks = (
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link
          data-test='component-logout-link'
          onClick={logout}
          to='#!'
          className='black-text'
        >
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link
          data-test='component-register-link'
          to='/register'
          className='black-text'
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          data-test='component-login-link'
          to='/login'
          className='black-text'
        >
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav data-test='component-navbar'>
        <div className='nav-wrapper white'>
          <Link to='/' className='brand-logo black-text'>
            <i className='material-icons'>trending_up</i>
            StocksApp
          </Link>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
