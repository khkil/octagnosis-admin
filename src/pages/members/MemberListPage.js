import { Box, Container, Grid, Paper } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import CommonBreadcrumbs from '../../components/common/CommonBreadcrumbs';
import MemberList from '../../components/members/MemberList';
import { clearMember, fetchMemberList, FETCH_MEMBER_LIST } from '../../modules/member';
import Loader from '../../components/ui/Loader';
import SearchBar from '../../components/common/SearchBar';
import Paging from '../../components/common/Paging';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { memberListApi } from '../../api/memberApi';

const MemberListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('searchText'));
  const { isFetching, data, refetch } = useQuery(['memberList'], () => memberListApi(searchParams));

  const pageNum = useMemo(() => Number(searchParams.get('page') ? searchParams.get('page') : 1), [searchParams]);
  const startNum = useMemo(() => (!data ? 0 : data.data.totalElements - (pageNum - 1) * data.data.size), [data]);
  const pageInfo = useMemo(() => (!data ? {} : data.data));

  const searchMember = e => {
    e.preventDefault();
    searchParams.set('searchText', searchText);
    searchParams.delete('page');
    setSearchParams(searchParams);
    refetch();
  };

  const goPage = page => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    refetch();
  };

  return (
    <Container maxWidth={'xl'}>
      <Grid container alignContent={'center'} spacing={2}>
        <Grid item xs={12}>
          <SearchBar
            sx={{ mb: 2 }}
            value={searchText}
            onChange={e => {
              const { name, value } = e.target;
              setSearchText(value);
            }}
            onSubmit={searchMember}
            placeholder={'회원명을 입력해주세요'}
          />
        </Grid>
        {!isFetching && (
          <>
            <Grid item xs={12}>
              <MemberList memberList={pageInfo.content} startNum={startNum} />
            </Grid>

            <Grid item xs={12}>
              <Paging pageInfo={pageInfo} page={pageNum} setPage={goPage} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default MemberListPage;
