import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div data-test='component-login' className='container'>
        <div style={{ marginTop: '4rem' }} className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to
              home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className='grey-text text-darken-1'>
                Don't have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={(e) => onSubmit(e)}>
              <div className='input-field col s12'>
                <input
                  data-test='component-email-input'
                  onChange={(e) => onChange(e)}
                  value={email}
                  // error={errors.email}
                  id='email'
                  type='email'
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field col s12'>
                <input
                  data-test='component-password-input'
                  onChange={(e) => onChange(e)}
                  value={password}
                  // error={errors.password}
                  id='password'
                  type='password'
                />
                <label htmlFor='password'>Password</label>
              </div>
              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  data-test='component-submit-btn'
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
