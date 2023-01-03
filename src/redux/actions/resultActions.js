import * as types from "../../constants";
import * as resultService from "../../services/resultService";

export const getResultList = (params) => async dispatch => {
  dispatch({ type: types.RESULT_LIST_REQUEST });
  try {
    const data = await resultService.getResultList(params);
    dispatch({ type: types.RESULT_LIST_SUCCESS, response: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.RESULT_LIST_FAILURE, error: e });
    
  } 
}

export const updateResults = (resultIdx, results) => {

  
}

