import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { memberDetailApi, memberListApi } from '../api/memberApi';
import { DELAY_TIME } from '../utils/sagaUtil';
import { startLoading, endLoading } from './loading';

export const CLEAR_MEMBER = 'member/CLEAR_MEMBER';
export const clearMember = createAction(CLEAR_MEMBER);

/* 회원목록 */
export const FETCH_MEMBER_LIST = 'member/FETCH_MEMBER_LIST';
const FETCH_MEMBER_LIST_SUCCESS = 'member/FETCH_MEMBER_LIST_SUCCESS';
const FETCH_MEMBER_LIST_FAIL = 'member/FETCH_MEMBER_LIST_FAIL';

export const fetchMemberList = createAction(FETCH_MEMBER_LIST);
const fetchMemberListSuccess = createAction(FETCH_MEMBER_LIST_SUCCESS, data => data);
const fetchMemberListFailure = createAction(FETCH_MEMBER_LIST_FAIL, error => error);

function* memberListSaga(action) {
  yield put(startLoading(FETCH_MEMBER_LIST));
  try {
    yield delay(DELAY_TIME);
    const { data } = yield call(memberListApi, action.payload);
    yield put(fetchMemberListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchMemberListFailure(e));
  } finally {
    yield put(endLoading(FETCH_MEMBER_LIST));
  }
}
/** */
/* 회원 상세 */
export const FETCH_MEMBER_DETAIL = 'member/FETCH_MEMBER_DETAIL';
const FETCH_MEMBER_DETAIL_SUCCESS = 'member/FETCH_MEMBER_DETAIL_SUCCESS';
const FETCH_MEMBER_DETAIL_FAIL = 'member/FETCH_MEMBER_DETAIL_FAIL';

export const fetchMemberDetail = createAction(FETCH_MEMBER_DETAIL);
const fetchMemberDetailSuccess = createAction(FETCH_MEMBER_DETAIL_SUCCESS, data => data);
const fetchMemberDetailFailure = createAction(FETCH_MEMBER_DETAIL_FAIL, error => error);

function* memberDetailSaga(action) {
  yield put(startLoading(FETCH_MEMBER_DETAIL));
  try {
    yield delay(DELAY_TIME);
    const { data } = yield call(memberDetailApi, action.payload);
    yield put(fetchMemberDetailSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchMemberDetailFailure(e));
  } finally {
    yield put(endLoading(FETCH_MEMBER_DETAIL));
  }
}
/** */
const initialState = {
  list: [],
  pageInfo: {},
  selected: {},
  error: null,
};

export function* memberSaga() {
  yield takeLatest(FETCH_MEMBER_LIST, memberListSaga);
  yield takeLatest(FETCH_MEMBER_DETAIL, memberDetailSaga);
}

const member = handleActions(
  {
    [CLEAR_MEMBER]: () => initialState,
    [FETCH_MEMBER_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload.list,
      pageInfo: action.payload,
    }),
    [FETCH_MEMBER_LIST_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_MEMBER_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    [FETCH_MEMBER_DETAIL_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default member;
