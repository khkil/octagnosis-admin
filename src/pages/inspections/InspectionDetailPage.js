import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import HorizonalTabs from '../../components/inspections/HorizonalTabs';
import CommonBreadcrumbs from '../../components/common/CommonBreadcrumbs';
import InspectionDetailInfo from '../../components/inspections/InspectionDetailInfo';
import ResultsWithQuestions from '../../components/inspections/questions/ResultsWithQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';
import question, { clearQuestion, fetchQuestionList, FETCH_QUESTION_LIST } from '../../modules/question';
import Loader from '../../components/ui/Loader';
import { useParams } from 'react-router-dom';
import { fetchResultList, FETCH_RESULT_LIST, LOADING_RESULT } from '../../modules/result';
import ResultList from '../../components/inspections/results/ResultList';

const tabData = [
  {
    text: '상세정보',
    value: 'basic',
  },
  {
    text: '문항관리',
    value: 'question',
  },
  {
    text: '결과관리',
    value: 'result',
  },
];

const InspectionDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const { inspectionIdx } = useParams();
  const [tabValue, setTabValue] = useState(tabData[2].value);

  const { loading, inspectionDetail, questionList, resultList } = useSelector(
    ({ loading, inspection, question, result }) => ({
      loading: {
        inspection: loading[FETCH_INPECTION_DETAIL] === undefined || Boolean(loading[FETCH_INPECTION_DETAIL]),
        question: loading[FETCH_QUESTION_LIST] === undefined || Boolean(loading[FETCH_QUESTION_LIST]),
        result: loading[LOADING_RESULT] === undefined || Boolean(loading[LOADING_RESULT]),
      },
      inspectionDetail: inspection.selected,
      questionList: question.list,
      resultList: result.list,
    }),
  );

  const initQuestions = () => {
    dispatch(
      fetchQuestionList({
        inspectionIdx: inspectionIdx,
        params: {
          sortColumn: 'questionNumber',
          direction: 'asc',
        },
      }),
    );
  };

  useEffect(() => {
    if (tabValue === 'basic') {
      dispatch(fetchInspectionDetail(inspectionIdx));
    } else if (tabValue === 'question') {
      dispatch(fetchResultList(inspectionIdx));
      initQuestions();
    } else if (tabValue === 'result') {
      dispatch(fetchResultList(inspectionIdx));
    }
  }, [inspectionIdx, tabValue]);

  return (
    <Container maxWidth={'xl'}>
      <HorizonalTabs tabData={tabData} tabValue={tabValue} setTabValue={setTabValue} />
      <Paper>
        {tabValue === 'basic' ? (
          loading.inspection ? (
            <Loader />
          ) : (
            <InspectionDetailInfo inspectionDetail={inspectionDetail} />
          )
        ) : tabValue === 'question' ? (
          loading.question ? (
            <Loader />
          ) : (
            <ResultsWithQuestions
              inspectionIdx={Number(inspectionIdx)}
              resultList={resultList}
              questionList={questionList}
              fetchQuestionList={initQuestions}
            />
          )
        ) : tabValue === 'result' ? (
          loading.result ? (
            <Loader />
          ) : (
            <ResultList
              resultList={resultList}
              initData={() => {
                dispatch(fetchResultList(inspectionIdx));
              }}
            />
          )
        ) : null}
      </Paper>
    </Container>
  );
};

export default InspectionDetailPage;
