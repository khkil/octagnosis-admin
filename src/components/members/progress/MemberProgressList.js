import * as React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Card,
  Typography,
  Grid,
} from '@mui/material';
import MemberProgress from './MemberProgress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#27313e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MemberProgressList = ({ progressList }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: '15%' }} align="center">
              검사명
            </StyledTableCell>
            <StyledTableCell style={{ width: '67%' }} align="center">
              검사 상태
            </StyledTableCell>
            <StyledTableCell style={{ width: '15%' }} align="center">
              결제 상태
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressList.map(({ inspectionName, userCount, totalCount }, index) => (
            <MemberProgress key={index} inspectionName={inspectionName} userCount={userCount} totalCount={totalCount} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberProgressList;
