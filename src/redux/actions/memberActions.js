import * as types from "../../constants";
import * as memberService from "../../services/memberService";

export const getMemberList = (params) => async dispatch  => {
  dispatch({ type: types.MEMBER_LIST_REQUEST });
  try {
    const data = await memberService.getMemberList(params);
    dispatch({ type: types.MEMBER_LIST_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.MEMBER_LIST_FAILURE, error: e });
    
  } 
}

export const getMemberDetail = (idx) => async dispatch  => {
  dispatch({ type: types.DATA_REQUEST });
  try {
    const data = await memberService.getMemberDetail(idx);
    dispatch({ type: types.DATA_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.DATA_FAILURE, error: e });
    
  } 
}



export const updateMember = (idx, member) => async dispatch  => {
  dispatch({ type: types.MEMBER_UPDATE_REQUEST });
  try {
    const data = await memberService.updateMember(idx, member);
    dispatch({ type: types.MEMBER_UPDATE_SUCCESS, data: data });

  } catch (e) {
    dispatch({ type: types.MEMBER_UPDATE_FAILURE, error: e });
    
  } finally{
    dispatch({ type: types.MEMBER_RESET });
  }
}
