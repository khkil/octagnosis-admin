import React, { forwardRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const AlertDialog = ({ open, title, desc, onClose, onConfirm }) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button variant="contained" color="primary" onClick={onConfirm}>
            확인
          </Button>
          <Button variant="contained" onClick={onClose} color="error">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;