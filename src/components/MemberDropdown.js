import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@material-ui/core";

import { logout, signOut } from "../redux/actions/authActions";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;



const MemberDropdown = () => {

  const { isLoggedIn, data } = useSelector(state => state.authReducer);
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    dispatch(logout());
    history.push("/auth/login");
  };

  useEffect(() => {
    setAnchorMenu(null);
  }, [history.location])

  return (
    
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >

        {isLoggedIn && data ?
          <div>
            <Link to="/">
              <MenuItem>홈</MenuItem>
            </Link>
            <Link to="/member/profile">
              <MenuItem>
                내 정보
              </MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>
              로그아웃
            </MenuItem>
          </div>
          :
          <div>
            <MenuItem>
              <Link to="/auth/login">로그인</Link>
            </MenuItem>
          </div>
        }

      </Menu>
    </React.Fragment>
  );
}

export default MemberDropdown;
