import * as types from "../../constants";

const accessToken = localStorage.getItem("accessToken");
const initialState = { isLoggedIn: accessToken !== null, isAdmin: false, loading: false, data: null, error: '' };

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case types.AUTH_GET_INFO_REQUEST :
    case types.VALIDATE_TOKEN_REQUEST :
    case types.REISSUE_TOKEN_REQUEST :
      return {
        ...state,
        loading: true
      };
    case types.AUTH_GET_INFO_SUCCESS :
    case types.VALIDATE_TOKEN_SUCCESS :
    case types.REISSUE_TOKEN_SUCCESS :
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        data: action.data,
      };

    case types.AUTH_GET_INFO_FAILURE:
    case types.VALIDATE_TOKEN_FAILURE :
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: action.error
      };
    case types.REISSUE_TOKEN_FAILURE :
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        data: null,
        error: action.error
      };

    case types.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
      };


    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        error: '',
        loading: true,
      };

    case types.AUTH_LOGIN_SUCCESS:
      
      return {
        ...state,
        data: action.data,
        isLoggedIn: true,
        loading: false,
        error: '',
      };

    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.AUTH_LOGOUT:
      return initialState;

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.AUTH_SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        data: action.data
      };
    case types.AUTH_SIGN_UP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error
      };

    case types.AUTH_FIND_ID_REQUEST : 
    case types.AUTH_CHECK_ID_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.AUTH_FIND_ID_SUCCESS :
    case types.AUTH_CHECK_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case types.AUTH_FIND_ID_FAILURE :
    case types.AUTH_CHECK_ID_FAILURE :
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.AUTH_SMS_VALIDATE_REQUEST:
      return {
        initialState,
        loading: true
      };

    case types.AUTH_SMS_VALIDATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case types.AUTH_SMS_VALIDATE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
  

    default:
      return state;
  }
}
