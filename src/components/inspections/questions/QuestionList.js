import React, { useCallback, useState } from 'react';
import { Box, List, Alert, AlertTitle, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Question from './Question';
import { RestartAlt, Save, Add } from '@mui/icons-material';
import { deleteQuestionApi, insertQuestionsApi } from '../../../api/questionApi';
import QuestionDetailPopup from './QuestionDetailPopup';
import { useDispatch } from 'react-redux';
import { fetchQuestionDetail } from '../../../modules/question';

const QuestionList = ({ inspectionIdx, resultIdx, resultName, initialQuestionList, fetchQuestionList }) => {
  const dispatch = useDispatch();
  const [questionList, setQuestionList] = useState(initialQuestionList);
  const [showDeletedQuestions, setShowDeletedQuestions] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  const getQuestionDetail = questionIdx => {
    dispatch(fetchQuestionDetail(questionIdx));
    setShowDetailPopup(true);
  };

  const updateQuestions = () => {
    if (!confirm('변경 사항을 저장하시겠습니까?')) return false;
    insertQuestionsApi(questionList).then(() => {
      fetchQuestionList();
    });
  };

  const addQuestion = () => {
    const nextQuestionNumber = questionList
      .filter(({ delYn }) => delYn === 'N')
      .reduce((nextNumber, { questionNumber }) => {
        return questionNumber + 1;
      }, 0);
    const dummyQuestion = {
      inspectionIdx: Number(inspectionIdx),
      resultIdx: resultIdx,
      questionNumber: nextQuestionNumber,
      questionText: '',
      delYn: 'N',
    };
    setQuestionList([...questionList, dummyQuestion]);
  };

  const deleteQuestion = questionIdx => {
    if (!confirm('해당 문항을 삭제하시겠습니까?')) return;
    deleteQuestionApi(questionIdx)
      .then(({ success }) => {
        if (Boolean(success)) {
          alert('삭제에 성공하였습니다.');
          fetchQuestionList();
        }
      })
      .catch(() => {});
  };

  const restoreQuestion = (questionIdx, index) => {
    const question = questionList.find(question => question.questionIdx === questionIdx);
    const dataList = [...questionList];
    dataList.splice(index, 1, { ...question, delYn: 'N' });
    setQuestionList(dataList);
  };

  const resetItems = useCallback(() => {
    initNumbers(initialQuestionList);
    setQuestionList(initialQuestionList);
  }, [initialQuestionList]);

  const onDragEnd = ({ destination, source }) => {
    const items = [...questionList];
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    initNumbers(items);
    setQuestionList(items);
  };

  const initNumbers = questionList => {
    const dataList = [...questionList];
    dataList.forEach((question, index) => {
      const questionNumber = index + 1;
      question.questionNumber = questionNumber;
    });
    setQuestionList(dataList);
  };

  return (
    <Box>
      <QuestionDetailPopup
        fetchQuestionList={fetchQuestionList}
        showDetailPopup={showDetailPopup}
        setShowDetailPopup={setShowDetailPopup}
      />
      <Alert severity="success">
        <AlertTitle>
          <Typography variant="h6">{resultName}</Typography>
        </AlertTitle>
      </Alert>
      <Box pt={1} pl={1}>
        <Button variant="contained" startIcon={<Add />} onClick={addQuestion}>
          문항추가
        </Button>
        <FormControlLabel
          control={<Checkbox />}
          checked={showDeletedQuestions}
          onClick={() => {
            setShowDeletedQuestions(!showDeletedQuestions);
          }}
          label="삭제된 문항 포함"
          sx={{ float: 'right' }}
        />
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {questionList.map(({ questionIdx, questionNumber, questionText, delYn }, index) => (
                <Draggable key={index} draggableId={`question_${index}`} index={index}>
                  {provided => (
                    <Question
                      provided={provided}
                      questionIdx={questionIdx}
                      questionNumber={questionNumber}
                      questionText={questionText}
                      delYn={delYn}
                      questionList={questionList}
                      setQuestionList={setQuestionList}
                      getQuestionDetail={getQuestionDetail}
                      showDeletedQuestions={showDeletedQuestions}
                      deleteQuestion={deleteQuestion}
                      restoreQuestion={restoreQuestion}
                      index={index}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      {JSON.stringify(initialQuestionList) !== JSON.stringify(questionList) && (
        <Box
          pb={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={<RestartAlt />}
            style={{ marginRight: 10 }}
            onClick={resetItems}
          >
            초기화
          </Button>
          <Button
            size="large"
            variant="contained"
            startIcon={<Save />}
            style={{ marginRight: 10 }}
            onClick={updateQuestions}
          >
            저장
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default QuestionList;
