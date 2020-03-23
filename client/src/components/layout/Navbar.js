import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div className='nav-wrapper white'>
            <Link
              to='/'
              className='brand-logo black-text'
              style={{ fontFamily: 'monospace' }}
            >
              <i className='material-icons'>trending_up</i>
              StocksApp
            </Link>
            <ul className='right hide-on-med-and-down'>
              <li>
                <Link to='#' className='black-text'>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        ;
      </Fragment>
    );
  }
}
export default Navbar;
