import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid } from '@mui/material';
import Loader from '../ui/Loader';
import { Form, Formik } from 'formik';
import { Close, Save } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { groupCodeConfigApi, saveGroupCodeConfigApi } from '../../api/groupApi';

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const GroupCodeConfigPopup = ({ groupIdx, setOpenCodeConfigPopup, openCodeConfigPopup }) => {
  const [groupCodeConfig, setGroupCodeConfig] = useState({
    loading: false,
    data: {},
  });

  const handleClose = () => {
    setOpenCodeConfigPopup(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setGroupCodeConfig({
      ...groupCodeConfig,
      data: {
        ...groupCodeConfig.data,
        [name]: value,
      },
    });
  };

  const saveGroupCodeConfig = () => {
    const params = {
      groupIdx: groupIdx,
      ...groupCodeConfig.data,
    };
    saveGroupCodeConfigApi(groupIdx, params)
      .then(() => {
        alert('정보가 저장되었습니다.');
        handleClose();
      })
      .catch(() => {
        alert('서버와 통신에 실패하였습니다.');
      });
  };

  useEffect(() => {
    groupCodeConfigApi(groupIdx).then(({ success, data }) => {
      const group = data ? data : {};
      setGroupCodeConfig({ ...groupCodeConfig, data: group, loading: false });
    });
  }, [openCodeConfigPopup]);

  /*  if (isLoading) {
    return null;
  } */

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openCodeConfigPopup} maxWidth={'md'} fullWidth={true}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        회차코드 관리
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {groupCodeConfig.data.loading ? (
          <Loader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="date"
                label="만료일"
                name="expireDate"
                variant="outlined"
                fullWidth
                value={groupCodeConfig.data.expireDate}
                readonly
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="등록일"
                variant="outlined"
                fullWidth
                value={groupCodeConfig.data.createdDate}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="등록 가능 회원수"
                name="maxCount"
                variant="outlined"
                fullWidth
                value={groupCodeConfig.data.maxCount}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="등록중 갯수" variant="outlined" fullWidth disabled InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" onClick={saveGroupCodeConfig} startIcon={<Save />}>
          설정저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupCodeConfigPopup;
