import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import DaumPostcode from 'react-daum-postcode';

const useStyles = makeStyles(theme => ({
  closeBtn: {
    float: 'right',
  },
}));

const FindAddressPopup = ({ open, setOpen, onComplete }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={'xl'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <IconButton aria-label="close" className={classes.closeBtn} onClick={handleClose} children={<CloseIcon />} />
        <Typography variant="h4" component="div">
          주소 찾기
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>주소를 검색하신 후 클릭 해주세요.</DialogContentText>
        <DaumPostcode onComplete={onComplete} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default FindAddressPopup;
