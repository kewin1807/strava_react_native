import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import auth from './auth';
import profile from './profile';

const config = {
  key: 'Strava',
  storage: AsyncStorage,
  whitelist: ['profile', 'auth'],
  blacklist: ['form'],
  timeout: 10000,
};
// const authConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
//   blacklist: ['code'],
// };

const rootReducer = combineReducers({
  auth: auth,
  profile: profile,
});

//persist reducer load asyncStorage to redux store

export default persistReducer(config, rootReducer);
