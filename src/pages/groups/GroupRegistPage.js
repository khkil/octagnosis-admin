import { Box, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { groupRegistApi } from '../../api/groupApi';
import CommonBreadcrumbs from '../../components/common/CommonBreadcrumbs';
import GroupForm from '../../components/groups/GroupForm';

const GroupRegistPage = ({ match, history }) => {
  const registGroup = group => {
    groupRegistApi(group)
      .then(({ success, data }) => {
        if (Boolean(success)) {
          alert('등록에 성공 하였습니다.');
          const { idx } = data;
          navigate(`/groups/${idx}`);
        } else {
          alert('등록에 실패 하였습니다.');
        }
      })
      .catch(error => {
        alert('server error');
        console.error(error);
      });
    console.log(group);
  };
  return (
    <Container maxWidth={'xl'}>
      <CommonBreadcrumbs match={match} />
      <Paper>
        <GroupForm onSubmit={registGroup} />
      </Paper>
    </Container>
  );
};

export default GroupRegistPage;
