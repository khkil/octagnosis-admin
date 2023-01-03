import React, { useState } from 'react';
import { withStyles, makeStyles } from '@mui/styles';
import { Paper, Tab, Tabs, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
  tabs: {
    "& button[aria-selected='true']": {
      color: 'white',
      background: theme.palette.primary.main,
    },
  },
  tab: {
    border: '1px solid rgb(224, 227, 231)',
    color: 'red !important',
  },
}));

const InspectionDetailTabs = ({ tabValue, setTabValue }) => {
  const classes = useStyles();

  const handleChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <Tabs
      className={classes.tabs}
      value={tabValue}
      onChange={handleChange}
      TabIndicatorProps={{ style: { background: 'white' } }}
      textColor="primary"
      aria-label="disabled tabs example"
    >
      <Tab className={classes.tab} label={<Typography variant="subtitle1">상1세정보</Typography>} value="basic" />
      <Tab className={classes.tab} label={<Typography variant="subtitle1">문항관리</Typography>} value="question" />
    </Tabs>
  );
};

export default InspectionDetailTabs;
