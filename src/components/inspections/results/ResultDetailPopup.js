import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextareaAutosize,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResultDetail, fetchResultList } from '../../../modules/result';
import { Save } from '@mui/icons-material';

const ResultDetailPopup = ({ inspectionIdx, selectedResultIdx, setSelectedResultIdx }) => {
  const dispatch = useDispatch();
  const open = useMemo(() => selectedResultIdx !== null, [selectedResultIdx]);
  const { resultDetail } = useSelector(({ result }) => ({
    resultDetail: result.selected,
  }));

  const { resultIdx, resultName, resultContents } = resultDetail;

  const handleClose = () => {
    setSelectedResultIdx(null);
  };

  useEffect(() => {
    if (selectedResultIdx) {
      dispatch(
        fetchResultDetail({
          inspectionIdx: inspectionIdx,
          resultIdx: selectedResultIdx,
        }),
      );
      console.log(selectedResultIdx);
    }
  }, [selectedResultIdx]);

  if (!resultIdx) return null;
  return (
    <Dialog maxWidth="xl" open={open}>
      <DialogTitle sx={{ m: 0, p: 2, width: 1200 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {resultName}
      </DialogTitle>
      <DialogContent dividers>
        {resultContents.map(({ content }, index) => (
          <Box sx={{ m: 2 }}>
            <TextareaAutosize
              style={{ fontSize: 15, width: '100%' }}
              key={index}
              aria-label="maximum height"
              placeholder="결과지 내용을 입력해주세요"
              defaultValue={content}
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="contained" startIcon={<Save />}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultDetailPopup;
