import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { questionDetailApi, questionListApi } from '../api/questionApi';
import { startLoading, endLoading, startLoadingPersist } from './loading';

const CLEAR_QUESTION = 'question/CLEAR_QUESTION';
export const clearQuestion = createAction(CLEAR_QUESTION);

export const FETCH_QUESTION_LIST = 'question/FETCH_QUESTION_LIST';
const FETCH_QUESTION_LIST_SUCCESS = 'question/FETCH_QUESTION_LIST_SUCCESS';
const FETCH_QUESTION_LIST_FAIL = 'question/FETCH_QUESTION_LIST_FAIL';

export const fetchQuestionList = createAction(FETCH_QUESTION_LIST);
const fetchQuestionListSuccess = createAction(FETCH_QUESTION_LIST_SUCCESS, data => data);
const fetchQuestionListFailure = createAction(FETCH_QUESTION_LIST_FAIL, e => e);

function* questionListSaga(action) {
  yield put(startLoading(FETCH_QUESTION_LIST));
  try {
    const { data } = yield call(questionListApi, action.payload);
    yield put(fetchQuestionListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchQuestionListFailure(e));
  } finally {
    yield put(endLoading(FETCH_QUESTION_LIST));
  }
}

export const FETCH_QUESTION_DETAIL = 'question/FETCH_QUESTION_DETAIL';
const FETCH_QUESTION_DETAIL_SUCCESS = 'question/FETCH_QUESTION_DETAIL_SUCCESS';
const FETCH_QUESTION_DETAIL_FAIL = 'question/FETCH_QUESTION_DETAIL_FAIL';

export const fetchQuestionDetail = createAction(FETCH_QUESTION_DETAIL);
const fetchQuestionDetailSuccess = createAction(FETCH_QUESTION_DETAIL_SUCCESS, data => data);
const fetchQuestionDetailFailure = createAction(FETCH_QUESTION_DETAIL_FAIL, e => e);

function* questionDetailSaga(action) {
  yield put(startLoadingPersist(FETCH_QUESTION_DETAIL));
  try {
    const { data } = yield call(questionDetailApi, action.payload);
    yield put(fetchQuestionDetailSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchQuestionDetailFailure(e));
  } finally {
    yield put(endLoading(FETCH_QUESTION_DETAIL));
  }
}

export function* questionSaga() {
  yield takeLatest(FETCH_QUESTION_LIST, questionListSaga);
  yield takeLatest(FETCH_QUESTION_DETAIL, questionDetailSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

const question = handleActions(
  {
    [CLEAR_QUESTION]: () => initialState,
    [FETCH_QUESTION_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
    [FETCH_QUESTION_LIST_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_QUESTION_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    [FETCH_QUESTION_DETAIL_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default question;
