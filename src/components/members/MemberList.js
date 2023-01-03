import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#27313e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MemberList = ({ memberList, startNum }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">이메일</StyledTableCell>
            <StyledTableCell align="center">연락처</StyledTableCell>
            <StyledTableCell align="center">가입일</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberList.map(({ idx, name, email, phone, cdate }, index) => (
            <StyledTableRow key={idx}>
              <StyledTableCell component="th" scope="row">
                {startNum - index}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  href="#"
                  underline="hover"
                  color={'rgb(25, 118, 210)'}
                  variant="subtitle1"
                  onClick={e => {
                    e.preventDefault();
                    navigate(`/members/${idx}`);
                  }}
                >
                  {name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">{email}</StyledTableCell>
              <StyledTableCell align="center">{phone}</StyledTableCell>
              <StyledTableCell align="center">{cdate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberList;
