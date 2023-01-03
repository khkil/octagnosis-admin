import * as types from "../../constants";
import * as service from "../../services/userService";

export const getUserList = (inspectionIdx, page, params) => async dispatch  => {
  dispatch({ type: types.USER_LIST_REQUEST });
  try {
    const data = await service.getUserList(inspectionIdx, page, params);
    dispatch({ type: types.USER_LIST_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_LIST_FAILURE, error: e });
    
  }
}

export const deleteUser = (userIdx) => async dispatch  => {
  dispatch({ type: types.USER_DELETE_REQUEST });
  try {
    await service.deleteUser(userIdx);
    dispatch({ type: types.USER_DELETE_SUCCESS, data: userIdx });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_DELETE_FAILURE, error: e });
    
  }
}

export const modifyUser = (userIdx, params) => async dispatch  => {
  dispatch({ type: types.USER_MODIFY_REQUEST });
  try {
    await service.modifyUser(userIdx, params);
    dispatch({ type: types.USER_MODIFY_SUCCESS, data: { userIdx: userIdx} });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_MODIFY_FAILURE, error: e });
    
  }
}

export const getUserAnswers = (userIdx) => async dispatch  => {
  dispatch({ type: types.USER_ANSWER_LIST_REQUEST });
  try {
    const data = await service.getUserAnswers(userIdx);
    dispatch({ type: types.USER_ANSWER_LIST_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_ANSWER_LIST_FAILURE, error: e });
    
  } 
}

export const registUserAnswers = (param) => async dispatch  => {
  dispatch({ type: types.USER_ANSWER_REGIST_REQUEST });
  try {
    const { data } = await service.registUserAnswers(param);
    dispatch({ type: types.USER_ANSWER_REGIST_SUCCESS, data: data});

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_ANSWER_REGIST_FAILURE, error: e });
    
  } 
}
