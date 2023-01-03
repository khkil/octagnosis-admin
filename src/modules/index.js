import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loading from './loading';
import { all, call } from 'redux-saga/effects';
import auth, { authSaga, LOGOUT_SUCCESS } from './auth';
import inspection, { inspectionSaga } from './inspection';
import question, { questionSaga } from './question';
import result, { resultSaga } from './result';
import member, { memberSaga } from './member';
import group, { groupSaga } from './group';
import progress, { progressSaga } from './progress';
import menu from './menu';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const appReducer = combineReducers({
  loading,
  auth,
  inspection,
  question,
  result,
  member,
  group,
  progress,
  menu,
});

const rootReducer = (state, action) => {
  const { type } = action;
  if (type === LOGOUT_SUCCESS) {
    const persistState = {
      inspection: state.inspection,
    };
    return appReducer(persistState, action);
  }
  return appReducer(state, action);
};

//root saga
export function* rootSaga() {
  yield all([authSaga(), memberSaga(), groupSaga(), inspectionSaga(), questionSaga(), resultSaga(), progressSaga()]);
}

export default persistReducer(persistConfig, rootReducer);
