import * as types from "../../constants";

const initialState = { loading: false, data: null, error: null, selected: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    
    case types.CLEAR_GROUP : 
      return initialState;

    case types.GROUP_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GROUP_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.GROUP_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.GROUP_DETAIL_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GROUP_DETAIL_SUCCESS:
      return {
        ...state,
        data: null,
        loading: false,
        selected: actions.data
      };
    case types.GROUP_DETAIL_FAILURE:
      return {
        ...state,
        error: actions.error
      };

    case types.GROUP_REGIST_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GROUP_REGIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.state.data, actions.group]
      };
    case types.GROUP_REGIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.GROUP_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GROUP_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.GROUP_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };
      
    default:
      return state;
  }
}
