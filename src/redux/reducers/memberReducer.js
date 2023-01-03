import * as types from "../../constants";

const initialState = { loading: false, response: null, selected: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    
    case types.MEMBER_RESET:
      return initialState;

    case types.MEMBER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.MEMBER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        response: actions.data
      };
    case types.MEMBER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
        };

    case types.MEMBER_UPDATE_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.MEMBER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: actions.data
      };
    case types.MEMBER_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    default:
      return state;
  }
}
