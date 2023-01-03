import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
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
  makeStyles,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import MenuBar from "../../../components/MenuBar";
import { getAdminGroups } from "../../../services/groupService";
import Paging from "../../../components/common/Paging";
import queryString from "query-string";
import { getAdminGroupList } from "../../../redux/actions/groupActions";
import Loader from "../../../components/Loader";
import { CLEAR_GROUP } from "../../../constants";

const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#376fd0",
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

const AdminGroupList = ({ match }) => {
  
  const useStyles = makeStyles({
    menu: {
      padding: '10px',
    }
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [params, setParams] = useState(queryString.parse(location.search));

  const goPage = (page) => {
    setParams({
      ...params,
      pageNum: page
    })
  }

  const goDetailPage = (groupIdx) => {
    history.push(`/admin/groups/${groupIdx}`)
  }

  const goRegistPage = () => {
    history.push(`/admin/groups/regist`)
  }

  useEffect(() => {
      dispatch(getAdminGroupList(params));
      return () => {
        dispatch({ type: CLEAR_GROUP});
      }
  }, [params]);

  const { data, loading } = useSelector(state => state.groupReducer);

  if(!data || loading) return <Loader/>;
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />


      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
        <Grid item>
          <Button variant="contained" color="primary" onClick={goRegistPage}>
            <AddIcon />새 기관 추가
          </Button>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        {data && 
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">기관명</StyledTableCell>
                  <StyledTableCell align="center">연락처</StyledTableCell>
                  <StyledTableCell align="center">담당자명</StyledTableCell>
                  <StyledTableCell align="center">이메일</StyledTableCell>
                  <StyledTableCell align="center">등록일</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.list.map(({ idx, name, tel, contactName, contactEmail, cdate }) => 
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      <Link 
                        component="button" 
                        onClick={() => { goDetailPage(idx) } }
                      >
                        {name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{tel}</StyledTableCell>
                    <StyledTableCell align="center">{contactName}</StyledTableCell>
                    <StyledTableCell align="center">{contactEmail}</StyledTableCell>
                    <StyledTableCell align="center">{cdate}</StyledTableCell>
                  </StyledTableRow>
                  
                )}
                
              </TableBody>
            </Table>
          </TableContainer>
          <Paging 
            page={params.pageNum ? Number(params.pageNum) : 1} 
            goPage={goPage} 
            pageInfo={data}
          />
        </Grid>
        }
      </Grid>
    </React.Fragment>
  );
}

export default AdminGroupList;
