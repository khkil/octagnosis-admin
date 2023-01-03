import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const Loading = () => {

  const useStyles = makeStyles({
    loader: {
      position: "fixed",
      left: "calc(50% - 30px)",
      top: "calc(50% - 30px)"
    }
  });
  const classes = useStyles();
  return (
    <CircularProgress className={classes.loader} size={60} /> 
  )
}

export default Loading;