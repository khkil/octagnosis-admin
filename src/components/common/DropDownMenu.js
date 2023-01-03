import React from 'react';
import { useHistory } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function DropDownMenu({ idx }) {

  const history = useHistory();
  const memberDetail = () => {
    history.push(`/admin/members/${idx}`);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <MoreHorizIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={memberDetail}>상세정보</MenuItem>
        <MenuItem onClick={handleClose}>닫기</MenuItem>
      </Menu>
    </>
  );
}