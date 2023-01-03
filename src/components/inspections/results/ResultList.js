import { Add, Save } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grid, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { insertResultsApi } from '../../../api/resultApi';
import Result from './Result';
import ResultDetailPopup from './ResultDetailPopup';

const ResultList = ({ resultList, initData }) => {
  const { inspectionIdx } = useParams();
  const [newResults, setNewResults] = useState([]);
  const [selectedResultIdx, setSelectedResultIdx] = useState(null);

  const addedNewResults = useMemo(() => newResults.length > 0, [newResults]);

  const addResult = () => {
    const result = {
      resultName: '',
    };
    setNewResults([...newResults, result]);
  };

  const changeResultName = (index, event) => {
    const { value } = event.target;
    let changedResult = { ...newResults[index], resultName: value };
    setNewResults([
      ...newResults.map((result, x) => {
        return x === index ? changedResult : result;
      }),
    ]);
  };

  const removeResult = index => {
    setNewResults([
      ...newResults.filter((result, x) => {
        return x !== index;
      }),
    ]);
  };

  const insertResults = () => {
    insertResultsApi(inspectionIdx, newResults).then(({ success }) => {
      if (Boolean(success)) {
        alert('등록에 성공하였습니다.');
        initData();
      }
    });
  };

  return (
    <Box p={2}>
      <ResultDetailPopup
        inspectionIdx={inspectionIdx}
        selectedResultIdx={selectedResultIdx}
        setSelectedResultIdx={setSelectedResultIdx}
      />

      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Button size={'small'} variant="contained" startIcon={<Add />} onClick={addResult}>
            새 결과 추가
          </Button>
        </Grid>
        {resultList.map(({ resultIdx, resultName }) => (
          <Result
            key={resultIdx}
            resultIdx={resultIdx}
            resultName={resultName}
            selectedResultIdx={selectedResultIdx}
            setSelectedResultIdx={setSelectedResultIdx}
          />
        ))}
        {newResults.map(({ resultName }, index) => (
          <Grid item sm={2} key={index}>
            <Card sx={{ minHeight: 120 }}>
              <CardContent sx={{ minHeight: 40 }}>
                <TextField
                  size="small"
                  label="Outlined"
                  variant="outlined"
                  value={resultName}
                  onChange={event => {
                    changeResultName(index, event);
                  }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    removeResult(index);
                  }}
                >
                  삭제
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {addedNewResults && (
          <Grid item sm={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" size={'large'} startIcon={<Save />} onClick={insertResults}>
                등록하기
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ResultList;
