import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import iexAPI from './iexAPI';
import watchList from './watchList';

export default combineReducers({
  alert,
  auth,
  iexAPI,
  watchList,
});
