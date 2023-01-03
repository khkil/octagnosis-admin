import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Drawer, Toolbar, Divider, Box, Typography } from '@mui/material';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../../modules/auth';
import CommonBreadcrumbs from '../common/CommonBreadcrumbs';

export const CommonLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let navigate = useNavigate();

  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn,
  }));

  useEffect(() => {
    dispatch(validateTokenRequest());
  }, []);

  if (!isLoggedIn) return <Navigate to="/auth/login" />;
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <CommonBreadcrumbs />
        {children}
      </Box>
    </Box>
  );
};

export default CommonLayout;
