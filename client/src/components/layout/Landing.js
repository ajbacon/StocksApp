import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>
            <span>StocksApp</span>
          </h4>
          <p className='flow-text grey-text text-darken-1'>
            Track stocks and shares and trade in a mock environment
          </p>
          <br />
          <div className='col s6'>
            <Link
              to='/register'
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            >
              Register
            </Link>
          </div>
          <div className='col s6'>
            <Link
              to='/login'
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              className='btn btn-large waves-effect waves-light hoverable white black-text'
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);
