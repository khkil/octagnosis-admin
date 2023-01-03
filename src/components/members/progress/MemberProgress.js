import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Box, Grid, Typography, LinearProgress, Button, TableRow, TableCell, Table } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles({
  progressBar: {
    height: '25px !important',
  },
  startBtn: {
    background: '#007434 !important',
  },
  resultBtn: {
    background: '#27313e !important',
  },
});

const MemberProgress = ({ inspectionName, userCount, totalCount }) => {
  const classes = useStyles();
  const progressValue = useMemo(
    () => (userCount === 0 ? 0 : Math.round((userCount / totalCount) * 100)),
    [userCount, totalCount],
  );

  return (
    <StyledTableRow>
      <TableCell align="center">
        <Typography variant="h6">{inspectionName}</Typography>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '96%', mr: 1 }}>
            <LinearProgress className={classes.progressBar} variant="determinate" value={progressValue} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {`${progressValue}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell align="center">
        <Typography variant="h6">결제 완료</Typography>
      </TableCell>
    </StyledTableRow>
  );
};

export default MemberProgress;
