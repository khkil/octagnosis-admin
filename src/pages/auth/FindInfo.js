import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Paper, styled, Tab, Tabs, Typography } from '@material-ui/core';
import { MobileScreenShare, Person } from '@material-ui/icons';
import Box from '@material-ui/core/Box';

const FindInfo = ({ match }) => {

  const Wrapper = styled(Paper)`
    padding: 10px;
  }`;

  const style = {
    padding: '30px',
  };

  const valueMap = {
    0: '아이디',
    1: '비밀번호'
  }

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(match);
  })

  return (
    <>
      <Wrapper style={style}>
        <Typography component="h1" variant="h3" align="center" gutterBottom>
          회원정보 찾기
        </Typography>
        <Grid container spacing={9}>
          <Grid item xs={12}>
            <Paper square>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={(e, newValue) => {setValue(newValue)}}
                indicatorColor="primary"
                textColor="primary"
                aria-label="disabled tabs example"
              >
                {Object.keys(valueMap).map((key, index) => 
                  <Tab key={index} label={valueMap[key]} />
                )}
              </Tabs>
            </Paper>
          </Grid>
          
          {value === 0 ? 
            <>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6" align="center" gutterBottom>
                  ID 찾기를 위한 본인확인 방법을 선택해주세요.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to="/auth/find-info/id?type=phone">
                  <Button type="button" fullWidth variant="contained" color="primary" size="large">
                    <MobileScreenShare/> 
                    <Box p={3}>휴대폰으로 찾기</Box>
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to="/auth/find-info/id?type=info">
                  <Button type="submit" fullWidth variant="contained" color="primary" size="large">
                    <Person/>
                    <Box p={3}>이름, 이메일로 찾기</Box>
                  </Button>
                </Link>
              </Grid>
            </> :
            <>
            <Grid item xs={12}>
              <Typography component="h1" variant="h6" align="center" gutterBottom>
                ID를 입력해주세요
              </Typography>
            </Grid>
            <Grid item xs={12}>
              1
            </Grid>
            </>
          }
          
        </Grid>
      </Wrapper>
    </>
  )
}

export default FindInfo;