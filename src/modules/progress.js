import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { memberProgressListApi } from '../api/progressApi';
import { DELAY_TIME } from '../utils/sagaUtil';
import { startLoading, endLoading } from './loading';

export const FETCH_MEMBER_PROGRESS_LIST = 'progress/FETCH_MEMBER_PROGRESS_LIST';
export const FETCH_MEMBER_PROGRESS_LIST_SUCCESS = 'progress/FETCH_MEMBER_PROGRESS_LIST_SUCCESS';
export const FETCH_MEMBER_PROGRESS_LIST_FAIL = 'progress/FETCH_MEMBER_PROGRESS_LIST_FAIL';

export const fetchMemberProgressList = createAction(FETCH_MEMBER_PROGRESS_LIST);
const fetchMemberProgressListSuccess = createAction(FETCH_MEMBER_PROGRESS_LIST_SUCCESS, data => data);
const fetchMemberProgressListFailure = createAction(FETCH_MEMBER_PROGRESS_LIST_FAIL, error => error);

function* memberProgressListSaga(action) {
  yield put(startLoading(FETCH_MEMBER_PROGRESS_LIST));
  try {
    yield delay(DELAY_TIME);
    const { data } = yield call(memberProgressListApi, action.payload);
    yield put(fetchMemberProgressListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchMemberProgressListFailure(e));
  } finally {
    yield put(endLoading(FETCH_MEMBER_PROGRESS_LIST));
  }
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

export function* progressSaga() {
  yield takeLatest(FETCH_MEMBER_PROGRESS_LIST, memberProgressListSaga);
}

const progress = handleActions(
  {
    [FETCH_MEMBER_PROGRESS_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
    [FETCH_MEMBER_PROGRESS_LIST_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default progress;
