import {takeLatest, all, put} from 'redux-saga/effects';
import {saveToken} from '../actions/auth';
import {saveProfile} from '../actions/profile';

const unusedProperties = [
  'accessToken',
  'refreshToken',
  'expires_in',
  'expires_at',
  'unstructuredData',
  'status',
];

// tuong ung voi function login trong file actions/auth.js
function* login(action) {
  yield put(
    saveToken({
      access_token: action.payload.authentication.access_token,
      refresh_token: action.payload.authentication.refresh_token,
      expires_in: action.payload.authentication.expires_in,
      expires_at: action.payload.authentication.expires_at,
    }),
  );
  const profile = action.payload.authentication.athlete;
  yield put(saveProfile(profile));
}

export default [
  function* fetchWatcher() {
    yield all([takeLatest('auth/login', login)]);
  },
];
