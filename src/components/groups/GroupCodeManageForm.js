import { Alert, Box, Grid, List } from '@mui/material';
import React from 'react';
import GroupCode from './GroupCode';

const GroupCodeManageForm = () => {
  const codeList = [
    {
      codeIdx: 1,
      code: 123,
    },
    {
      codeIdx: 2,
      code: 2222,
    },
  ];
  return (
    <Box component="form">
      <Grid container p={2}>
        <Grid item xs={12} sm={12} mb={2}>
          <Alert severity="info">코드 정보</Alert>
        </Grid>
        {codeList.map(({ codeIdx, code }) => (
          <Grid item xs={12} key={codeIdx}>
            <GroupCode codeIdx={codeIdx} code={code} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GroupCodeManageForm;
