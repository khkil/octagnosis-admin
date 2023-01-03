import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { validateToken } from "../redux/actions/authActions";
import * as types from "../constants";
import { getAccessToken } from "../services/tokenService";

const AuthGuard = ({ children, path }) => {
  
  const dispatch = useDispatch();

  const { data, isLoggedIn } = useSelector(state => state.authReducer);
  //const redirectPath = useMemo((path.indexOf("admin") > -1 || path.indexOf("ground") > -1) ? "/admin/login" : "/auth/login", [path]);
  const accessToken = getAccessToken();
  
  useEffect(() => {
    /* console.log("this is authguard");
    if(accessToken && isLoggedIn){
      dispatch(validateToken());
    } */
  }, [accessToken, path]);

  if(!isLoggedIn && !data){
    return <Redirect to="/admin/login"/>;
  }else if(!isLoggedIn){
    return null;
  }else{
    return children;
  }

}

export default AuthGuard;
