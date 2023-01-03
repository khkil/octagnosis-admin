import { combineReducers } from "redux";
import inspectionReducer from "./reducers/inspectionReducer"
import resultReducer from "./reducers/resultReducer"
import dataReducer from "./reducers/dataReducer"
import themeReducer from "./reducers/themeReducer";
import authReducer from "./reducers/authReducer";
import memberReducer from "./reducers/memberReducer";
import smsReducer from "./reducers/smsReducer";
import groupReducer from "./reducers/groupReducer";
import userReducer from "./reducers/userReducer";

export const rootReducer = combineReducers({
  inspectionReducer,
  resultReducer,
  dataReducer,
  themeReducer,
  authReducer,
  memberReducer,
  smsReducer,
  groupReducer,
  userReducer,
});
