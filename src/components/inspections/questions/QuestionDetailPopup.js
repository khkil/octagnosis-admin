import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Grid,
  Box,
  Paper,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import { Cancel, Close, RestartAlt, Save } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FETCH_QUESTION_DETAIL } from '../../../modules/question';
import AnswerList from './answers/AnswerList';
import FileUploadDropzone from '../../../components/common/FileUploadDropzone';
import { fileUploadApi } from '../../../api/fileApi';
import { TYPE_IMAGE } from '../../../constants';
import { updateQuestionApi } from '../../../api/questionApi';

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ minWidth: 1200 }} {...other}>
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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const QuestionDetail = ({ questionDetail, onClose, onSubmit }) => {
  const initialQuestion = { ...questionDetail };
  const [questionForm, setQuestionForm] = useState(questionDetail);
  const { questionIdx, questionNumber, questionText } = useMemo(() => questionDetail, [questionDetail.questionIdx]);

  const handleChange = (event, value) => {
    const { name } = event.target;
    const changedValue = value ? value : event.target.value;
    setQuestionForm({
      ...questionForm,
      [name]: changedValue,
    });
  };

  const updateQuestion = () => {
    onSubmit(questionForm);
  };

  const uploadFiles = files => {
    const directory = '????????????/??????/';
    const maxFiles = 1;
    if (files.length > maxFiles) {
      alert(`${maxFiles}??? ?????? ????????? ????????? ?????? ?????????.`);
      return;
    }
    fileUploadApi(directory, files)
      .then(({ success }) => {
        if (success) {
          const uploadedFiles = files.map(({ path }) => ({
            name: path,
            path: directory + path,
          }));
          setQuestionForm({ ...questionForm, filePath: uploadedFiles });
        } else {
          alert('???????????? ?????? ???????????????');
        }
      })
      .catch(e => {
        alert('server error');
        console.error(e);
      });
  };

  const deleteFile = fileIndex => {
    const files = questionForm.filePath;
    setQuestionForm({
      ...questionForm,
      filePath: files.filter((file, index) => index !== fileIndex),
    });
  };

  const resetQuestion = () => {
    setQuestionForm(initialQuestion);
  };

  return (
    <>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        <Typography variant="h5">{`${questionNumber}. ${questionText}`}</Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers sx={{ m: 0, p: 2 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          ??????
        </Alert>
        <TextField
          fullWidth
          name="questionText"
          label="?????????"
          value={questionForm.questionText}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <Alert variant="info">?????? ??????</Alert>
        <ToggleButtonGroup color="info" value={questionForm.questionType} onChange={handleChange} exclusive>
          <ToggleButton name="questionType" value="TEXT">
            ????????????
          </ToggleButton>
          <ToggleButton name="questionType" value="IMAGE">
            ????????????
          </ToggleButton>
        </ToggleButtonGroup>
        {questionForm.questionType === TYPE_IMAGE && (
          <FileUploadDropzone filePath={questionForm.filePath} onDrop={uploadFiles} onDelete={deleteFile} />
        )}

        <Alert variant="info">?????? ??????</Alert>
        <ToggleButtonGroup color="info" value={questionForm.answerType} onChange={handleChange} exclusive>
          <ToggleButton name="answerType" value="TEXT">
            ????????????
          </ToggleButton>
          <ToggleButton name="answerType" value="IMAGE">
            ????????????
          </ToggleButton>
        </ToggleButtonGroup>
        <Alert severity="info" sx={{ mt: 2 }}>
          ??????
        </Alert>
        <AnswerList questionForm={questionForm} setQuestionForm={setQuestionForm} />
      </DialogContent>
      <DialogActions>
        {/* <Button variant="outlined" size="large" startIcon={<RestartAlt />} onClick={resetQuestion}>
          ?????????
        </Button> */}
        <Button color="primary" variant="contained" size="large" startIcon={<Save />} onClick={updateQuestion}>
          ??????
        </Button>
        <Button color="error" variant="contained" size="large" startIcon={<Cancel />} onClick={onClose}>
          ??????
        </Button>
      </DialogActions>
    </>
  );
};

const QuestionDetailPopup = ({ fetchQuestionList, showDetailPopup, setShowDetailPopup }) => {
  const { loading, questionDetail } = useSelector(({ loading, question }) => ({
    loading: loading[FETCH_QUESTION_DETAIL] === undefined || Boolean(loading[FETCH_QUESTION_DETAIL]),
    questionDetail: question.selected,
  }));

  const onClose = () => {
    setShowDetailPopup(false);
  };

  const onSubmit = question => {
    if (!confirm('?????????????????????????')) return;
    const { questionIdx } = questionDetail;
    updateQuestionApi(questionIdx, question)
      .then(({ success }) => {
        if (success) {
          alert('????????? ?????????????????????.');
          fetchQuestionList();
        } else {
          alert('????????? ??????????????????.');
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <Dialog maxWidth="xl" aria-labelledby="customized-dialog-title" open={showDetailPopup}>
      {!loading && <QuestionDetail questionDetail={questionDetail} onClose={onClose} onSubmit={onSubmit} />}
    </Dialog>
  );
};

export default QuestionDetailPopup;
