import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { green, orange } from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";
import queryString from "query-string";
import Paging from "../../../components/common/Paging";
import { spacing } from "@material-ui/system";
import DropDownMenu from "../../../components/common/DropDownMenu"
import { useDispatch, useSelector } from "react-redux";
import { getMemberList } from "../../../redux/actions/memberActions";
import MenuBar from "../../../components/MenuBar";
import { getMemberDetail } from "../../../services/memberService";
const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.paid && green[500]};
  background: ${(props) => props.sent && orange[700]};
  color: ${(props) =>
    (props.paid || props.sent) && props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const AdminMemberList = ({ location, match, history }) => {
  
  const dispatch = useDispatch();
  const memberReducer = useSelector(state => state.memberReducer);
  const { response } = memberReducer;

  const query = queryString.parse(location.search);
  const firstUpdate = useRef(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchParam, setSearchParam] = useState(query);
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goPage = (page) => {
    setSearchParam({
      ...searchParam,
      pageNum: page
    });

    
  }
  useEffect(() => {
    dispatch(getMemberList(query));
  }, [location]);


  useEffect(() => {
    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    history.push({
      pathname: "/admin/members",
      search: "?" + new URLSearchParams(searchParam).toString()
    })
  }, [searchParam]);

  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      {/* <MenuBar match={match}/> */}

      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
        <Grid item>
          <Button variant="contained" color="primary">
            <AddIcon />
            New Order
          </Button>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
      {(response && Boolean(response.success)) &&
        <Grid item xs={12}>
          <Paper>
            {/* <Toolbar>
              <ToolbarTitle>
              <Typography variant="h6" id="tableTitle">
                회원
              </Typography>
              </ToolbarTitle>
            </Toolbar> */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">이름</TableCell>
                  <TableCell align="center">아이디</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center">휴대전화</TableCell>
                  <TableCell align="center">가입일</TableCell>
                  <TableCell align="center">기능</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response.data.list.map((member, index) => (

                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{member.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Link 
                        component="button" 
                        onClick={e => {
                          e.preventDefault;
                          history.push(`/admin/members/${member.idx}`);
                        }}>
                        {member.id}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{member.email}</StyledTableCell>
                    <StyledTableCell align="center">{member.phone}</StyledTableCell>
                    <StyledTableCell align="center">{member.cdate}</StyledTableCell>
                    <StyledTableCell align="center">
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
                        <MenuItem onClick={handleClose}>삭제</MenuItem>
                        <MenuItem onClick={handleClose}>닫기</MenuItem>
                      </Menu>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Paging 
            page={query.pageNum ? Number(query.pageNum) : 1} 
            goPage={goPage} 
            pageInfo={response.data}
          />
        </Grid>
      }
      </Grid>
    </React.Fragment>
  );
}

export default AdminMemberList;
