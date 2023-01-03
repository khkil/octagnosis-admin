import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { logoutRequest } from '../../modules/auth';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'red',
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goMainPage = () => {
    navigate('/');
  };

  const logout = () => {
    dispatch(logoutRequest());
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} style={{ background: '#27313e' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" onClick={goMainPage}>
          <img src="/public/images/logo_octa.png" style={{ cursor: 'pointer' }} />
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={logout}>
          <Typography variant="h6">로그아웃</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
