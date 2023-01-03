import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as authActions from "../redux/actions/authActions";

const Ground = ({ children }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  
  const logout = () => {
    
    if(confirm("로그아웃 하시겠습니까?")){
      dispatch(authActions.logout());
    }
  }
  return (
    <React.Fragment>

      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            News
        </Typography>
          <Button color="inherit">Login</Button> */}
          <Grid container alignItems="center">
            <Button color="inherit" onClick={() => { history.push("/ground")}}>
              <Typography variant="h3">
                지면검사 관리 시스템
              </Typography>
            </Button>
            <Grid item xs />
              <Button size="large" color="inherit" onClick={() => { history.push("/admin") }}>관리자 홈</Button>
              <Button size="large" color="inherit" onClick={logout}>로그아웃</Button>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </React.Fragment>
  )
}

export default Ground;