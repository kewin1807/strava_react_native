import {fork, all} from 'redux-saga/effects';
import auth from './auth';

const rootSaga = function*() {
  yield all([...auth.map(watcher => fork(watcher))]);
};

export default rootSaga;
