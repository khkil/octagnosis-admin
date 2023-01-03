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
    border: '1px solid rgb(224, 227, 231) !important',
  },
}));

const HorizonalTabs = ({ tabData, tabValue, setTabValue }) => {
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
      {tabData.map(({ text, value }, index) => (
        <Tab
          className={classes.tab}
          key={index}
          label={<Typography variant="subtitle1">{text}</Typography>}
          value={value}
        />
      ))}
    </Tabs>
  );
};

export default HorizonalTabs;
