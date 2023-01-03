import React, { useCallback } from 'react';
import { Grid, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDeleteResult } from '../../../modules/result';

const Result = ({ resultIdx, resultName, selectedResultIdx, setSelectedResultIdx }) => {
  const dispatch = useDispatch();
  const { inspectionIdx } = useParams();

  const showResultDetail = useCallback(() => {
    setSelectedResultIdx(resultIdx);
  });

  const deleteResult = useCallback(() => {
    if (!confirm('결과를 삭제하시겠습니까? 복원할수 없습니다.')) return;
    dispatch(
      fetchDeleteResult({
        inspectionIdx: inspectionIdx,
        resultIdx: resultIdx,
      }),
    );
  });

  return (
    <Grid item sm={2}>
      <Card>
        <CardContent sx={{ minHeight: 40 }}>
          <Typography variant="h5" component="div">
            {resultName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={showResultDetail}>
            상세정보
          </Button>
          <Button size="small" color="error" variant="contained" onClick={deleteResult}>
            삭제
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Result;
