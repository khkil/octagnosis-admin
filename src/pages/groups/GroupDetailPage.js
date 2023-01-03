import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { groupUpdateApi } from '../../api/groupApi';
import CommonBreadcrumbs from '../../components/common/CommonBreadcrumbs';
import GroupForm from '../../components/groups/GroupForm';
import Loader from '../../components/ui/Loader';
import { fetchGroupDetail, FETCH_GROUP_DETAIL } from '../../modules/group';

const GroupDetailPage = () => {
  const dispatch = useDispatch();
  const { groupIdx } = useParams();
  const { loading, groupDetail } = useSelector(({ loading, group }) => ({
    loading: loading[FETCH_GROUP_DETAIL] === undefined || Boolean(loading[FETCH_GROUP_DETAIL]),
    groupDetail: group.selected,
  }));
  const updateGroup = group => {
    groupUpdateApi(groupIdx, group)
      .then(({ data, success }) => {
        if (Boolean(success)) {
          alert('수정에 성공하였습니다.');
          navigate('/groups');
        } else {
          alert('수정에 실패하였습니다.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('server error');
      });
  };

  useEffect(() => {
    dispatch(fetchGroupDetail(groupIdx));
  }, []);

  return (
    <Container maxWidth={'xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Paper>
            <Box p={2}>
              <Typography variant="h5">{groupDetail.name}</Typography>
            </Box>
            <GroupForm initialValues={groupDetail} onSubmit={updateGroup} />
          </Paper>
        </>
      )}
    </Container>
  );
};

export default GroupDetailPage;
