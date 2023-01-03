import { Link, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../members/MemberList';

const GroupList = ({ groupList, startRow }) => {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">이메일</StyledTableCell>
            <StyledTableCell align="center">연락처</StyledTableCell>
            <StyledTableCell align="center">가입일</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupList.map(({ idx, name }, index) => (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center">{startRow + index}</StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  href="#"
                  underline="hover"
                  color={'rgb(25, 118, 210)'}
                  variant="subtitle1"
                  onClick={e => {
                    e.preventDefault();
                    navigate(`/groups/${idx}`);
                  }}
                >
                  {name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">이메일</StyledTableCell>
              <StyledTableCell align="center">연락처</StyledTableCell>
              <StyledTableCell align="center">가입일</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupList;
