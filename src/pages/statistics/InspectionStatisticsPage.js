import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const InspectionStatisticsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  return (
    <Grid container alignContent={'center'}>
      <Grid item>검사 통계</Grid>
    </Grid>
  );
};

export default InspectionStatisticsPage;
