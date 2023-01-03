import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import Answer from './Answer';

const AnswerList = ({ questionForm, setQuestionForm }) => {
  const { answers } = questionForm;

  return (
    <Box>
      {answers.map(
        ({ answerIdx, answerText, answerScore, filePath, delYn }, index) =>
          delYn === 'N' && (
            <Answer
              key={index}
              index={index}
              answerIdx={answerIdx}
              answerText={answerText}
              answerScore={answerScore}
              filePath={filePath}
              questionForm={questionForm}
              setQuestionForm={setQuestionForm}
            />
          ),
      )}
    </Box>
  );
};

export default AnswerList;
