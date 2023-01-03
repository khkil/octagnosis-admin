import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, CardActionArea, CardMedia, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography, RadioGroup, Radio, FormControlLabel, Divider, Fab } from '@material-ui/core';
import { DropzoneAreaBase, DropzoneDialog } from "material-ui-dropzone";
import * as questionService from '../../../services/questionService';
import Loader from '../../../components/Loader';
import { CloseIcon } from '@material-ui/data-grid';
import { fileUpload } from '../../../services/fileService';
import { FTP_URL, QUESTION_TYPE_IMAGE, QUESTION_TYPE_TEXT } from "../../../constants/index";
import { Add, Delete, Refresh, Remove } from "@material-ui/icons"
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
 
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  answer: {
    maxWidth: "200px",
    padding: 5

  },
  dropzone: {
    minHeight: "200px"
  },
  preview: {
    padding: "0px",
    margin: "0 auto",
    marginTop: "15px",
    maxWidth: "180px"
  },
  imageBox: {
    height: "250px",
    border: "1px solid #e0e0e0"
  },
  plusArea: {
    paddingTop: "5%"
  },
  radiusBtn: {
    background: "#e0e0e0",
    borderRadius: "10px"
  },
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const emptyFile = {
  filePath: null
}

const AnswerImage = memo(({ index, file, changeAnswer }) => {
  const classes = useStyles();
  const imageUrl = FTP_URL + file.path;

  const deleteImage = () => {
    changeAnswer(index, null, emptyFile );
  }
  
  return (
    <Card className={classes.imageBox}>
      <IconButton edge="end" aria-label="delete" children={<Delete color="error"/>} onClick={deleteImage} />
      <Divider my={3}/>
      <img src={imageUrl}/>
    </Card>
  )
});

const Answer = memo(({ index, answer, changeAnswer, removeAnswer, answerType }) => {
  const classes = useStyles();
  const { answerIdx, answerText, answerScore, filePath } = answer;
  const files = typeof filePath === "string" ? JSON.parse(filePath) : filePath;

  const uploadFile = useCallback(files => {
    
    if(files.length && files.length > 0){
      const { file } = files[0];
      const uploadedFile = { name: file.name, path: `/${file.path}` };
      const uploadedFiles = [uploadedFile];
      changeAnswer(index, null, { filePath: JSON.stringify(uploadedFiles)});

      fileUpload(file)
      .then(({ success }) => {
        if(!success) alert("업로드에 실패 하였습니다");
      })
      .catch(e => {
        alert("server error");
        console.error(e);
      });
    }
  });

  return (
    <Grid key={answerIdx} item xs className={classes.answer}>
      <Fab size="small" onClick={() => { removeAnswer(index) }} ><Remove color="error"/></Fab>
      {answerType == QUESTION_TYPE_IMAGE &&
        <Grid>
        {!filePath ? 
          <DropzoneAreaBase 
            filesLimit={1}
            onAdd={uploadFile}
            previewGridClasses={{
              item: classes.preview,
            }}
          /> :
          <AnswerImage index={index} file={files[0]} changeAnswer={changeAnswer}/>
        }
        </Grid>
      }
      <TextField
        label="답변명"
        name="answerText"
        defaultValue={answerText}
        className={classes.textField}
        onChange={(e) => changeAnswer(index, e)}
        margin="dense"
        variant="outlined"
      />
      <TextField
        label="배점"
        type="number"
        name="answerScore"
        defaultValue={answerScore}
        className={classes.textField}
        onChange={(e) => changeAnswer(index, e)}
        margin="dense"
        variant="outlined"
      />
    </Grid>
  )

});

const AdminQuestionDetail = ({ selectedQuestionIdx, setSelectedQuestionIdx}) => {

  const classes = useStyles();
  const open = useMemo(() => selectedQuestionIdx > 0);

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});

  const initQuestion = () => {
   
    setQuestion({ questionIdx: selectedQuestionIdx });
      setLoading(true);
      questionService.getQuestionDetail(selectedQuestionIdx)
      .then(response => {
        setQuestion(response);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert("server error");
        setLoading(false);
      })
  }

  const changeQuestion = (e) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: value
    })
  }

  const changeAnswer = (index, e, obj) => {

    let { answers } = question;
    const answerIndex = index;
    const answer = answers[answerIndex];
    
    let changedValue;
    if(e && e.target){
      const { name, value } = e.target;
      changedValue = {
        [name]: value
      }
    }else if(!e && obj){
      changedValue = obj;
    }
    if(!changedValue) return false;

    const changedAnswser = {...answer, ...changedValue };
    answers.splice(answerIndex, 1, changedAnswser);
    setQuestion({
      ...question,
      answers: answers
    });
  }

  const removeAnswer = (index) => {
    
    const { answers } = question;
    const removedAnswers = answers.filter((answer, x) => x !== index);

    setQuestion({
      ...question,
      answers: removedAnswers
    });
  }

  const updateQuestion = () => {
    //if(!confirm("저장 하시겠습니까?")) return false;
    questionService.updateQuestion(selectedQuestionIdx, question)
    .then(response => {
      console.log(response);
      alert("저장 되었습니다");
    })
    .catch(e => {
      console.error(e);
      alert("server error");
    });
  }

  const addAnswer = () => {

    const answerSkeleton = {
      answerIdx: null, 
      answerText: "", 
      answerScore: 0, 
      filePath : null
    }

    const { answers } = question;
    const addedAnswers = [...answers, answerSkeleton];
    setQuestion({
      ...question,
      answers: addedAnswers
    });
  }

  const uploadFile = (files) => {
    
    if(files.length && files.length > 0){
      const { file } = files[0];
      const uploadedFile = { name: file.name, path: `/${file.path}` };
      const uploadedFiles = JSON.stringify([uploadedFile]);
      setQuestion({
        ...question,
        filePath: uploadedFiles
      })

      /* fileUpload(file)
      .then(({ success }) => {
        if(!success) alert("업로드에 실패 하였습니다");
      })
      .catch(e => {
        alert("server error");
        console.error(e);
      }); */
    }
  };

  const removeFile = () => {
    setQuestion({
      ...question,
      ...emptyFile
    })
  }
  const onClose = () => {
    setSelectedQuestionIdx(0)
  };

  const questionType = useMemo(() => question.questionType, [question]);
  const answerType = useMemo(() => question.answerType, [question]);
  const questionFilePath = useMemo(() => {
    if(!question.filePath) return null;
    const files = JSON.parse(question.filePath);
    const filePath = files[0].path;
    return `${FTP_URL}${filePath}`;
  }, [question]);
  
  useEffect(() => {
    if(open){
      initQuestion();
    }
  }, [selectedQuestionIdx]);
  
  if(!question.questionIdx) return null;
  return (
    <Dialog open={open} maxWidth={"xl"} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {!loading &&
        <>
          <DialogTitle >
            <Typography variant="h4" component="div">{`${question.questionNumber}. ${question.questionText}`}</Typography>
            <IconButton aria-label="close" className={classes.closeBtn} onClick={onClose} children={<CloseIcon />} />
          </DialogTitle>
          <DialogContent dividers>
            

            <Box mb={6}>
              <Typography variant="h6" gutterBottom component="div">- 문항</Typography>

              <RadioGroup row aria-label="position" name="questionType" value={questionType} onChange={changeQuestion}>
                <FormControlLabel value={QUESTION_TYPE_TEXT} control={<Radio color="primary" />} label="텍스트형" />
                <FormControlLabel value={QUESTION_TYPE_IMAGE} control={<Radio color="primary" />} label="이미지형" />
              </RadioGroup>
              <Grid style={{maxWidth:195}}>
              {questionType === QUESTION_TYPE_IMAGE && 
                <>
                {questionFilePath ? 
                  <Card className={classes.imageBox}>
                    <IconButton edge="end" aria-label="delete" children={<Delete color="error"/>} onClick={removeFile} />
                    <Divider my={3}/>
                    <img src={questionFilePath}/>
                  </Card>:
                  <DropzoneAreaBase 
                    filesLimit={1}
                    onAdd={uploadFile}
                    previewGridClasses={{
                      item: classes.preview,
                    }}
                  />
                }
                </>
              }
              </Grid>
              <TextField
                fullWidth
                label="문항명"
                name="questionText"
                value={question.questionText}
                onChange={changeQuestion}
                margin="dense"
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom component="div">- 답변</Typography>
              <RadioGroup row aria-label="position" name="answerType" value={answerType} onChange={changeQuestion}>
                <FormControlLabel value={QUESTION_TYPE_TEXT} control={<Radio color="primary" />} label="텍스트형" />
                <FormControlLabel value={QUESTION_TYPE_IMAGE} control={<Radio color="primary" />} label="이미지형" />
              </RadioGroup>
              <Grid container >
                
                {question.answers.map((answer, index) => (
                  <Answer key={index} index={index} answer={answer} changeAnswer={changeAnswer} removeAnswer={removeAnswer} answerType={answerType}/>
                ))}
                <Grid className={classes.plusArea}>
                  <Fab size="large" onClick={addAnswer}>
                    <Add color="primary" />
                  </Fab>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" size="large" startIcon={<Refresh />} onClick={initQuestion}>
              초기화
            </Button>
            <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={updateQuestion}>
              저장
            </Button>
          </DialogActions>
        </>
      }
    </Dialog>

  );
}

export default AdminQuestionDetail;