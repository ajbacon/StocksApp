import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
