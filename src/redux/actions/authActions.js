import * as types from '../../constants'
import * as authService from '../../services/authService'
import { setAccessToken } from '../../services/tokenService'
import { timeout } from '../../utils/util'

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: types.AUTH_LOGIN_REQUEST })
  try {
    const { data } = await authService.login(credentials)
    dispatch({ type: types.AUTH_LOGIN_SUCCESS, data: data })
    return data
  } catch (e) {
    dispatch({ type: types.AUTH_LOGIN_FAILURE, error: e })
    return e
  }
}

export const validateToken = () => async (dispatch) => {
  dispatch({ type: types.VALIDATE_TOKEN_REQUEST })
  try {
    const data = await authService.validateToken()
    dispatch({ type: types.VALIDATE_TOKEN_SUCCESS, data: data })
  } catch (e) {
    dispatch({ type: types.VALIDATE_TOKEN_FAILURE, error: e })
  }
}

export const reissueToken = () => async (dispatch) => {
  dispatch({ type: types.REISSUE_TOKEN_REQUEST })
  try {
    const { data } = await authService.reissueAccessToken()
    dispatch({ type: types.REISSUE_TOKEN_SUCCESS, data: data })
  } catch (e) {
    dispatch({ type: types.REISSUE_TOKEN_FAILURE, error: e })
  }
}

export const checkId = (id) => async (dispatch) => {
  dispatch({ type: types.AUTH_CHECK_ID_REQUEST })
  try {
    const data = await authService.checkId(id)
    dispatch({ type: types.AUTH_CHECK_ID_SUCCESS, data: data })
  } catch (e) {
    console.error(e)
    dispatch({
      type: types.AUTH_CHECK_ID_FAILURE,
      error: e,
    })
  }
}

export const getAuthInfo = () => async (dispatch) => {
  dispatch({ type: types.AUTH_GET_INFO_REQUEST })
  try {
    const data = await authService.getAuthInfo()
    dispatch({ type: types.AUTH_GET_INFO_SUCCESS, data: data })
  } catch (e) {
    console.error(e)
    dispatch({
      type: types.AUTH_GET_INFO_FAILURE,
      error: e,
    })
  }
}

export const sendAuthSms = (params) => async (dispatch) => {
  dispatch({ type: types.SMS_SEND_REQUEST })
  try {
    const data = await authService.sendAuthSms(params)
    dispatch({ type: types.SMS_SEND_SUCCESS, data: data })
  } catch (e) {
    console.error(e)
    dispatch({ type: types.SMS_SEND_FAILURE, error: e })
  }
}

export const validateSms = (number) => async (dispatch) => {
  dispatch({ type: types.AUTH_SMS_VALIDATE_REQUEST })
  try {
    const data = await authService.validateSms(number)
    dispatch({ type: types.AUTH_SMS_VALIDATE_SUCCESS, data: data })
    console.log('try')
  } catch (error) {
    console.log('error')
    dispatch({ type: types.AUTH_SMS_VALIDATE_FAILURE, error: error })
  }
}

export const findId = (credentials, type) => async (dispatch) => {
  dispatch({ type: types.AUTH_FIND_ID_REQUEST })
  try {
    const data = await authService.findId(credentials, type)
    dispatch({ type: types.AUTH_FIND_ID_SUCCESS, data: data })
  } catch (e) {
    console.error(e)
    dispatch({ type: types.AUTH_FIND_ID_FAILURE, error: e })
  }
}

export const logout = () => (dispatch) => {
  try {
    authService.logout()
    dispatch({
      type: types.AUTH_LOGOUT,
    })
  } catch (e) {
    console.error(e)
  }
}

export const signUp = (credentials, history) => async (dispatch) => {
  const { location } = history
  const { pathname } = location
  const redirectPath = pathname.indexOf('admin') > -1 ? '/admin' : '/'

  dispatch({ type: types.AUTH_SIGN_UP_REQUEST, data: credentials })
  try {
    const data = await authService.signUp(credentials)
    dispatch({ type: types.AUTH_SIGN_UP_SUCCESS, data: data })
    if (data.accessToken) {
      const { accessToken } = data
      localStorage.setItem('accessToken', accessToken)
      history.push(redirectPath)
    }
  } catch (e) {
    dispatch({
      type: types.AUTH_GET_INFO_FAILURE,
      error: e,
    })
  }
}

export function resetPassword(credentials) {
  return async (dispatch) => {
    dispatch({ type: types.AUTH_RESET_PASSWORD_REQUEST })

    return authService
      .resetPassword(credentials)
      .then((response) => {
        dispatch({
          type: types.AUTH_RESET_PASSWORD_SUCCESS,
          email: response.email,
        })
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_RESET_PASSWORD_FAILURE })
        throw error
      })
  }
}

export function signOut() {
  return async (dispatch) => {
    dispatch({
      type: types.AUTH_SIGN_OUT,
    })
  }
}
