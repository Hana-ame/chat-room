// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getCookiesAsMap } from '../Tools/WebappUtils';

const PrivateRoute = ({ children }) => {
  let isLoggedIn = false

  const cookies = getCookiesAsMap(document)
  console.log(cookies)
  if (cookies.has("session_id")) {
    console.log('登录成功，session_id cookie已设置');
    isLoggedIn = true
  }
  
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
