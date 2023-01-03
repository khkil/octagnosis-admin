import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { withTheme } from "styled-components/macro";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useHistory, withRouter } from 'react-router';

import {
  Grid,
  Hidden,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  TextField,
  Typography,
  Button,
  AppBar,
  IconButton,
  makeStyles
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import NotificationsDropdown from "./NotificationsDropdown";
import MessagesDropdown from "./MessagesDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import UserDropdown from "./UserDropdown";
import { sidebarRoutes as routes } from "../routes/index";
import { Autocomplete } from "@material-ui/lab";
import MemberDropdown from "./MemberDropdown";
import * as authActions from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";




const Header = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const useStyles = makeStyles({
    menu: {
      padding: '10px',
    }
  });
  const classes = useStyles();
  
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
            <Button color="inherit" onClick={() => { history.push("/")}}>
              <Typography variant="h3">
                옥타그노시스 검사 페이지
              </Typography>
            </Button>
            
            <Grid item xs />
            
              <Button size="large" color="inherit" onClick={() => {history.push("/member/profile")}}>내 정보</Button>
              <Button size="large" color="inherit" onClick={logout}>로그아웃</Button>

            {/* <Grid item>
              <MemberDropdown />
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
