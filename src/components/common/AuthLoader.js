import { CircularProgress, makeStyles } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import React from 'react';



const AuthLoader = ({ loading }) => {
  const useStyles = makeStyles({
    root: {
      textAlign: "center",
      padding: 5
    },
    loader: {
      margin: "0 auto",
      position: "relative",
      display: "block",
    }
  });
  const classes = useStyles();
  
  if(!loading) return null;
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.center} size={25} /> 
    </div>
  )
}

export default AuthLoader;