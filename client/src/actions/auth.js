import axios from 'axios';

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
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.response);
  }
};
