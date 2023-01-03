/**
 * redux-actions 를 이용한 리듀서
 *
 */
import React from 'react';
import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const START_LOADING = 'loading/START_LOADING';
const START_LOADING_PERSIST = 'loading/START_LOADING_PERSIST';
const END_LOADING = 'loading/END_LOADING';

// 액션생성자함수
export const startLoading = createAction(START_LOADING, actionType => actionType);
export const startLoadingPersist = createAction(START_LOADING_PERSIST, actionType => actionType);
export const endLoading = createAction(END_LOADING, actionType => actionType);

// init states => 초기화
const initialState = {};

// reducer
const loading = handleActions(
  {
    [START_LOADING_PERSIST]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [START_LOADING]: (state, action) => ({
      ...initialState,
      [action.payload]: true,
    }),
    [END_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
