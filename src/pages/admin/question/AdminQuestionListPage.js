import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components/macro";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Chip as MuiChip,
  Divider as MuiDivider,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField
} from "@material-ui/core";
import { DragHandle, Delete, Assignment, RestoreFromTrash, Refresh, Remove } from "@material-ui/icons";
import SaveIcon from '@material-ui/icons/Save';

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import { getInspectionList } from "../../../redux/actions/inspectionActions";
import { Col, Row, Tabs, Table } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Loader from "../../../components/Loader";
import { getResultList } from "../../../redux/actions/resultActions";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AddIcon } from "@material-ui/data-grid";
import { deleteQuestion, updateQuestion, updateQuestions } from "../../../services/questionService";
import AlertDialog from "../../../components/common/dialogs/AlertDialog";
import { fileUpload } from "../../../services/fileService";
import AdminQuestionDetail from "./AdminQuestionDetail";

const Divider = styled(MuiDivider)(spacing);
const useStyles = makeStyles({
  margin: {
    margin: 10
  },
  results_tab: {
    borderRight: "1px solid #cccc"
  },
  deleteIcon: {
    cursor: "pointer",
    float: "right"
  },
  questionList: {
    paddingTop: 4,
    paddingBottom: 0,
  },
  question: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "white",
    borderRadius: "40px",
    border: "1px solid #cccc"
  }
});


const Question = memo(({ question, questions, setQuestions, setSelectedQuestionIdx, index }) => {
  const classes = useStyles();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const { questionIdx, questionNumber, questionText } = question; 

  const onDelete = (questionIdx) => {
    
    deleteQuestion(questionIdx)
    .then(() => {
      //const questions = questions.filter(question => question.questionIdx !== questionIdx);
      setQuestions(questions.map(question => question.questionIdx === questionIdx ? {...question, delYn : "Y" } : question));
      setShowDeleteDialog(false);
      
    }).catch(e => {
      console.error(e);
      alert("server error");
    });
  }

  const onRestore = (questionIdx) => {
    const param = { delYn : "N"};
    updateQuestion(questionIdx, param)
    .then(() => {
      setQuestions(questions.map(question => question.questionIdx === questionIdx ? {...question, ...param } : question));
      setShowRestoreDialog(false);
      
    }).catch(e => {
      console.error(e);
      alert("server error");
    });
  }
  return (
    <>
      <AlertDialog 
        title={"해당 문항을 삭제 하시겠습니까?"}
        desc={"삭제 후 복원 가능합니다"}
        open={showDeleteDialog} 
        onClose={() => { setShowDeleteDialog(false) }} 
        onConfirm={() => { onDelete(questionIdx) }}
      />
      <AlertDialog 
        title={"해당 문항을 복원 하시겠습니까?"}
        open={showRestoreDialog} 
        onClose={() => { setShowRestoreDialog(false) }} 
        onConfirm={() => { onRestore(questionIdx) }}
      />
        
      <Draggable key={index} draggableId={`question_${index}`} index={index}>
        {(provided, snapshot) => (
          <ListItem
            className={classes.question}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DragHandle/>
            <ListItemText primary={<Typography variant="h6">{questionNumber}. {questionText} </Typography>}/>
            {"N" === question.delYn ? 
              <>
                <IconButton edge="end" aria-label="delete" children={<Assignment color="secondary"/>} onClick={() => { setSelectedQuestionIdx(questionIdx) }}/>
                <IconButton edge="end" aria-label="delete" children={<Delete color="error"/>} onClick={() => { setShowDeleteDialog(true) }}/> 
              </> : 
              <>
                <IconButton edge="end" aria-label="delete" children={<RestoreFromTrash color="secondary" onClick={() => { setShowRestoreDialog(true) }}/>}/>
              </>
            }
          </ListItem>
        )}
      </Draggable>
    </>

  )
});

const EmptyQuestion = ({ index, question, questions, setQuestions }) => {
  const classes = useStyles();
  const { questionNumber } = question;

  const deleteQuestion = () => {
    const deletedQuestions = questions.filter((obj, x) => x !== index);
    setQuestions(deletedQuestions);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const addedQuestion = {
      ...questions.find((obj, x) => x === index),
      [name]: value
    }
    let addedQuestions = [...questions];
    addedQuestions.splice(index, 1, addedQuestion);
    setQuestions(addedQuestions);
  }

  return (
    <Draggable key={index} draggableId={`question_${index}`} index={index}>
      {(provided, snapshot) => (
        <ListItem
          className={classes.question}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragHandle/>
          <ListItemText primary={<><Typography variant="h6">{questionNumber}. <TextField name="questionText" onChange={handleChange} style={{minWidth: "50%"}}/></Typography></>}/>
          <IconButton edge="end" aria-label="delete" children={<Remove color="error"/>} onClick={deleteQuestion}/>
        </ListItem>
      )}
    </Draggable>
  )
}

const QuestionList = memo(({ results, selectedResult, inspectionIdx }) => {

  const classes = useStyles();
  const initialQuestions = useMemo(() => results[selectedResult] && results[selectedResult].questionList ? results[selectedResult].questionList : []);
  const minNumber = useMemo(() => Math.min(...initialQuestions.map(({ questionNumber }) => Number(questionNumber))));
  
  const [questions, setQuestions] = useState(initialQuestions);
  const [deleted, setDeleted] = useState(false);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [updatedQuestion, setupdatedQuestion] = useState({});
  
  const toggleDeleteBox = (e) => {
    const { checked } = e.target;
    setDeleted(checked);
  }

  const onDragEnd = (e) => {
    const { destination, source } = e;
    const orderedList = reOrder(questions, source.index, destination.index);
    setQuestions(orderedList);
  }

  const reOrder = (ininitailValues, startIndex, endIndex) => {
    const list = Array.from(ininitailValues);
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list.map((obj,index) => ({...obj, questionOrder : index + 1, questionNumber: minNumber + index }));
  }

  useEffect(() => {
    setQuestions(initialQuestions);
    setDeleted(false);
  }, [selectedResult]);

  const onUpdate = () => {
    updateQuestions(questions)
    .then(({ success }) => {
      if(success){
        alert("수정되었습니다");
      }else{
        alert("수정시 오류 발생");
      }
    })
  }

  const addQuestion = () => {
    const usedQuestions = questions.filter(question => question.delYn === "N");
    const nextNumber = usedQuestions.length > 0 ? Math.max(...usedQuestions.map(({ questionNumber }) => questionNumber )) + 1 : 1;
    const nextOrder = Math.max(...usedQuestions.map(({ questionOrder }) => questionOrder )) + 1;
    const resultIdx = results.find((result, index) => index === selectedResult).resultIdx;

    const initialQuestion = {
      inspectionIdx: inspectionIdx,
      resultIdx: resultIdx,
      questionNumber: nextNumber,
      questionText: "",
      questionOrder: nextOrder,
      delYn: "N"

    }
    setQuestions([...questions, initialQuestion]);
  }

  const reset = () => {
    setQuestions(initialQuestions);
  }

  const isChanged = useMemo(() => Boolean(JSON.stringify(initialQuestions) !== JSON.stringify(questions)), [questions]);

  return (
    <>
    <AdminQuestionDetail 
      selectedQuestionIdx={selectedQuestionIdx} 
      setSelectedQuestionIdx={setSelectedQuestionIdx}
      updatedQuestion={updatedQuestion}
      setupdatedQuestion={setupdatedQuestion}
    />
    <Grid>
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
        <FormControlLabel
            control={<Checkbox name="gilad" checked={deleted} onChange={toggleDeleteBox}/>}
            label="삭제 된 문항 포함"
          />
        </Grid>
        <Grid item>
          <Fab color="primary" aria-label="add" onClick={addQuestion}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {questions.filter(question => deleted ? question : question.delYn === "N").map((question, index) => (
                question.questionIdx ?
                <Question question={question} questions={questions} setQuestions={setQuestions} setSelectedQuestionIdx={setSelectedQuestionIdx} key={index} index={index} /> :
                <EmptyQuestion key={index} index={index} question={question} questions={questions} setQuestions={setQuestions}/>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Box display="flex" justifyContent="center" alignItems="center">
        {isChanged && 
          <Box >
            <Button className={classes.margin} color="primary" variant="contained" size="large" onClick={onUpdate}  startIcon={<SaveIcon />} >저장</Button>
            <Button className={classes.margin} color="primary" variant="contained" size="large" onClick={reset}  startIcon={<Refresh />}>초기화</Button>
          </Box>
        }
      </Box>
    </Grid>
    </>
  )
})
const ResultList = ({ selectedInspection }) => {

  const classes = useStyles();

  const disptach = useDispatch();
  const inspectionReducer = useSelector(state => state.inspectionReducer);
  const { loading, response } = useSelector(state => state.resultReducer);
  const { inspectionIdx } = inspectionReducer.response.data[selectedInspection];

  const [selectedResult, setSelectedResult] = useState(0);
  
  useEffect(() => {
    const param = { inspectionIdx: inspectionIdx };
    disptach(getResultList(param));
    setSelectedResult(0);

  }, [selectedInspection])
  
  if(!response) return null;
  return (
    <Grid container spacing={4}>
      <Grid item className={classes.results_tab} item xs={1}>
        <Tab.Container 
          id="left-tabs-example" 
          defaultActiveKey={selectedResult}
          onSelect={(v) => setSelectedResult(Number(v))}
        >
          <Row>
            <Col className="taC">
              <Nav variant="pills" className="flex-column">
                {response.data.map(({ resultName }, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={index}>{resultName}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </Grid>
      <Grid item xs={11}>
        <QuestionList results={response.data} selectedResult={selectedResult} inspectionIdx={inspectionIdx}/>
      </Grid>
    </Grid>
  )

}
const AdminQuestionListPage = ({ match }) => {

  const dispatch = useDispatch();
  const { response, loading } = useSelector(state => state.inspectionReducer);

  const [selectedInspection, setSelectedInspection] = useState(0);
  const firstUpdate = useRef(true);
  const payYn = match.path.includes("free") ? "N" : "Y";

  useEffect(() => {
    const params = {
      payYn: payYn
    }
    dispatch(getInspectionList(params));

    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  
  if(loading) return <Loader/>;
  if(!response || firstUpdate.current) return null;

  return (
  
    <React.Fragment>
      <Helmet title="회원 목록" />
      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match} />
      </Grid>
      <Divider my={3} />
      <Tabs 
        activeKey={selectedInspection}
        onSelect={(value) => setSelectedInspection(value)} 
        className="mb-3">
        {response.data.map(({ inspectionName }, index) => 
          <Tab key={index} eventKey={index} title={inspectionName}/>
        )}
      </Tabs>
      <ResultList selectedInspection={selectedInspection}/>
    </React.Fragment>
  );
}

export default AdminQuestionListPage;
