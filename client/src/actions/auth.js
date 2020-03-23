import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// register user
export const register = ({
  firstName,
  surname,
  email,
  password,
  password2
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firstName,
    surname,
    email,
    password,
    password2
  });

  try {
    const res = await axios.post('/api/users/register', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    Object.keys(err.response.data).forEach(key => {
      let msg = err.response.data[key];
      dispatch(setAlert(msg, 'danger'));
    });

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
