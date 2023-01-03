import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { deleteResultApi, resultDetailApi, resultListApi } from '../api/resultApi';
import { startLoading, endLoading } from './loading';

export const LOADING_RESULT = 'result/LOADING_RESULT';

/* 결과 목록 */
export const FETCH_RESULT_LIST = 'result/FETCH_RESULT_LIST';
const FETCH_RESULT_LIST_SUCCESS = 'result/FETCH_RESULT_LIST_SUCCESS';
const FETCH_RESULT_LIST_FAIL = 'result/FETCH_RESULT_LIST_FAIL';

export const fetchResultList = createAction(FETCH_RESULT_LIST);
const fetchResultListSuccess = createAction(FETCH_RESULT_LIST_SUCCESS, data => data);
const fetchResultListFailure = createAction(FETCH_RESULT_LIST_FAIL, e => e);

function* resultListSaga(action) {
  yield put(startLoading(LOADING_RESULT));
  try {
    const { data } = yield call(resultListApi, action.payload);
    yield put(fetchResultListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchResultListFailure(e));
  } finally {
    yield put(endLoading(LOADING_RESULT));
  }
}

/* 결과 상세 */
export const FETCH_RESULT_DETAIL = 'result/v';
const FETCH_RESULT_DETAIL_SUCCESS = 'result/FETCH_RESULT_DETAIL_SUCCESS';
const FETCH_RESULT_DETAIL_FAIL = 'result/FETCH_RESULT_DETAIL_FAIL';

export const fetchResultDetail = createAction(FETCH_RESULT_DETAIL);
const fetchResultDetailSuccess = createAction(FETCH_RESULT_DETAIL_SUCCESS, data => data);
const fetchResultDetailFailure = createAction(FETCH_RESULT_DETAIL_FAIL, e => e);

function* resultDetailSaga(action) {
  try {
    const { data } = yield call(resultDetailApi, action.payload);
    yield put(fetchResultDetailSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchResultDetailFailure(e));
  } finally {
  }
}

/* 결과 삭제 */

export const FETCH_DELETE_RESULT = 'result/DELETE_RESULT';
const DELETE_RESULT_SUCCESS = 'result/DELETE_RESULT_SUCCESS';
const DELETE_RESULT_FAIL = 'result/DELETE_RESULT_FAIL';

export const fetchDeleteResult = createAction(FETCH_DELETE_RESULT);
const deleteResultSuccess = createAction(DELETE_RESULT_SUCCESS, data => data);
const deleteResultFailure = createAction(DELETE_RESULT_FAIL, e => e);

function* deleteResultSaga(action) {
  yield put(startLoading(LOADING_RESULT));
  try {
    yield call(deleteResultApi, action.payload);
    yield put(deleteResultSuccess(action.payload));
  } catch (e) {
    console.error(e);
    yield put(deleteResultFailure(e));
  } finally {
    yield put(endLoading(LOADING_RESULT));
  }
}

export function* resultSaga() {
  yield takeLatest(FETCH_RESULT_LIST, resultListSaga);
  yield takeLatest(FETCH_RESULT_DETAIL, resultDetailSaga);
  yield takeLatest(FETCH_DELETE_RESULT, deleteResultSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

const result = handleActions(
  {
    [FETCH_RESULT_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
    [FETCH_RESULT_LIST_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_RESULT_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    [FETCH_RESULT_DETAIL_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [DELETE_RESULT_SUCCESS]: (state, action) => ({
      ...state,
      list: state.list.filter(({ resultIdx }) => resultIdx != action.payload.resultIdx),
    }),
    [DELETE_RESULT_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default result;
