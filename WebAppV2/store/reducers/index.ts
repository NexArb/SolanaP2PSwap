import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ConfigReducer from './config.reducer';

const Reducer = combineReducers({
  auth: AuthReducer,
  config: ConfigReducer,
});

export default Reducer;
