import * as types from "../../constants";

const initialState = { loading: false, response: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {

    case types.INSPECTION_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.INSPECTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        response: actions.response
      };
    case types.INSPECTION_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    default:
      return state;
  }
}
