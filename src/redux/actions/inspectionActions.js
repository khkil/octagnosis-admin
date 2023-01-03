import * as types from "../../constants";
import * as inspectionSerivce from "../../services/inspectionService";

export const getInspectionList = (params) => async dispatch  => {
  dispatch({ type: types.INSPECTION_LIST_REQUEST });
  try {
    const data = await inspectionSerivce.getInspectionList(params);
    dispatch({ type: types.INSPECTION_LIST_SUCCESS, response: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.INSPECTION_LIST_FAILURE, error: e });
    
  } 
}
