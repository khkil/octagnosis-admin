import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Grid, Box, Alert, MenuItem, Paper, Container } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MemberProgressList from '../../components/members/progress/MemberProgressList';
import CommonBreadcrumbs from '../../components/common/CommonBreadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberProgressList, FETCH_MEMBER_PROGRESS_LIST } from '../../modules/progress';
import { fetchMemberDetail, FETCH_MEMBER_DETAIL } from '../../modules/member';
import Loader from '../../components/ui/Loader';
import MemberDetail from '../../components/members/MemberDetail';

const MemberDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const { memberIdx } = useParams();
  const { loading, memberDetail, progressList } = useSelector(({ loading, member, progress }) => ({
    loading: !(loading[FETCH_MEMBER_DETAIL] === false && loading[FETCH_MEMBER_PROGRESS_LIST] === false),
    memberDetail: member.selected,
    progressList: progress.list,
  }));

  useEffect(() => {
    dispatch(fetchMemberDetail(memberIdx));
    dispatch(fetchMemberProgressList(memberIdx));
  }, []);

  return (
    <Container maxWidth={'xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CommonBreadcrumbs match={match} thirdText={memberDetail.name} />
          <Paper>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={12}>
                <MemberDetail memberDetail={memberDetail} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Alert severity="success">검사 진행 상황</Alert>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MemberProgressList progressList={progressList} />
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default MemberDetailPage;
