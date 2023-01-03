import * as types from "../../constants";

const initialState = { loading: false, data: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {

    case types.USER_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.USER_ANSWER_REGIST_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.USER_ANSWER_REGIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.USER_ANSWER_REGIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.USER_ANSWER_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.USER_ANSWER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.USER_ANSWER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.USER_DELETE_SUCCESS:

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          list: state.data.list.filter(({ userIdx }) => userIdx !== actions.userIdx)
        }
      };
    case types.USER_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.USER_MODIFY_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.USER_MODIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.USER_MODIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

      

    default:
      return state;
  }
}
