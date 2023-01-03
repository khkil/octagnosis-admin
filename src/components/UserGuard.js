import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { boolean } from "yup/lib/locale";

function UserGuard({ children }) {
  const { isLoggedIn, data } = useSelector((state) => state.authReducer);
  if(isLoggedIn && data){
    return <Redirect to="/" />;
  }
  return children;
}

export default UserGuard;
