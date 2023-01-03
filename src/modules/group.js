import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { groupDetailApi, groupListApi } from '../api/groupApi';
import { getPageVariables } from '../utils';
import { DELAY_TIME } from '../utils/sagaUtil';
import { startLoading, endLoading } from './loading';

/* 기관 목록 */
export const FETCH_GROUP_LIST = 'group/FETCH_GROUP_LIST';
export const FETCH_GROUP_LIST_SUCCESS = 'group/FETCH_GROUP_LIST_SUCCESS';
export const FETCH_GROUP_LIST_FAIL = 'group/FETCH_GROUP_LIST_FAIL';

export const fetchGroupList = createAction(FETCH_GROUP_LIST);
const fetchGroupListSuccess = createAction(FETCH_GROUP_LIST_SUCCESS, data => data);
const fetchGroupListFail = createAction(FETCH_GROUP_LIST_FAIL, error => error);

function* groupListSaga(action) {
  yield put(startLoading(FETCH_GROUP_LIST));
  try {
    const { data } = yield call(groupListApi, action.payload);
    yield put(fetchGroupListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchGroupListFail(e));
  } finally {
    yield put(endLoading(FETCH_GROUP_LIST));
  }
}

/* 기관 상세 */
export const FETCH_GROUP_DETAIL = 'group/FETCH_GROUP_DETAIL';
export const FETCH_GROUP_DETAIL_SUCCESS = 'group/FETCH_GROUP_DETAIL_SUCCESS';
export const FETCH_GROUP_DETAIL_FAIL = 'group/FETCH_GROUP_DETAIL_FAIL';

export const fetchGroupDetail = createAction(FETCH_GROUP_DETAIL);
const fetchGroupDetailSuccess = createAction(FETCH_GROUP_DETAIL_SUCCESS, data => data);
const fetchGroupDetailFail = createAction(FETCH_GROUP_DETAIL_FAIL, error => error);

function* groupDetailSaga(action) {
  yield put(startLoading(FETCH_GROUP_DETAIL));
  try {
    const { data } = yield call(groupDetailApi, action.payload);
    yield put(fetchGroupDetailSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchGroupDetailFail(e));
  } finally {
    yield put(endLoading(FETCH_GROUP_DETAIL));
  }
}

/* group saga */
export function* groupSaga() {
  yield takeLatest(FETCH_GROUP_LIST, groupListSaga);
  yield takeLatest(FETCH_GROUP_DETAIL, groupDetailSaga);
}

const initialState = {
  list: [],
  pageInfo: {},
  selected: {},
  error: null,
};

const group = handleActions(
  {
    [FETCH_GROUP_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload.list,
      pageInfo: getPageVariables(action.payload),
    }),
    [FETCH_GROUP_LIST_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_GROUP_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    [FETCH_GROUP_DETAIL_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default group;
