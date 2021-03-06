import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, surname, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      register({ firstName, surname, email, password, password2 });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <Fragment>
      <div data-test='component-register' className='container'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to
              home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className='grey-text text-darken-1'>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={(e) => onSubmit(e)}>
              <div className='input-field col s12'>
                <input
                  data-test='component-first-name'
                  onChange={(e) => onChange(e)}
                  value={firstName}
                  // error={errors.firstName}
                  id='firstName'
                  type='text'
                />
                <label htmlFor='firstName'>First Name</label>
              </div>
              <div className='input-field col s12'>
                <input
                  data-test='component-surname'
                  onChange={(e) => onChange(e)}
                  value={surname}
                  // error={errors.surname}
                  id='surname'
                  type='text'
                />
                <label htmlFor='surname'>Surname</label>
              </div>
              <div className='input-field col s12'>
                <input
                  data-test='component-email'
                  onChange={(e) => onChange(e)}
                  value={email}
                  // error={errors.email}
                  id='email'
                  type='email'
                  autoComplete='off'
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field col s12'>
                <input
                  data-test='component-password'
                  onChange={(e) => onChange(e)}
                  value={password}
                  // error={errors.password}
                  id='password'
                  type='password'
                  autoComplete='off'
                />
                <label htmlFor='password'>Password</label>
              </div>
              <div className='input-field col s12'>
                <input
                  data-test='component-password2'
                  onChange={(e) => onChange(e)}
                  value={password2}
                  // error={errors.password2}
                  id='password2'
                  type='password'
                />
                <label htmlFor='password2'>Confirm Password</label>
              </div>
              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  data-test='component-signup-btn'
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
