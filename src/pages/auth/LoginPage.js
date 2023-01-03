import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, LOGIN_REQUEST } from '../../modules/auth';
import { Redirect, useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
    minHeight: '90vh',
    padding: 350,
  },
  form: {
    padding: 25,
    textAlign: 'center',
  },
});

const LoginPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isLoading, isLoggedIn } = useSelector(({ loading, auth }) => ({
    isLoading: loading[LOGIN_REQUEST],
    isLoggedIn: auth.isLoggedIn,
  }));

  const handleSubmit = params => {
    dispatch(loginRequest(params));
  };
  const classes = useStyles();

  useEffect(() => {
    if (isLoggedIn) return navigate('/');
  }, [isLoggedIn]);

  return (
    <Container>
      <Box container spacing={0} justify="center" direction="row">
        <Grid container direction="column" justify="center" spacing={2} className={classes.root}>
          <Paper variant="elevation" elevation={2} className={classes.form}>
            <Grid item m={2}>
              <Typography variant="h5">옥타그노시스 관리자</Typography>
            </Grid>
            <Grid item>
              <Formik
                initialValues={{
                  id: '',
                  password: '',
                }}
                validationSchema={Yup.object().shape({
                  id: Yup.string().required('아이디를 입력하세요'),
                  password: Yup.string().max(255).required('비밀번호를 입력하세요'),
                })}
                onSubmit={(data, props) => {
                  handleSubmit(data);
                  /* setSubmitting(true);
                  console.log(data);
                  setSubmitting(false); */
                }}
              >
                {({ values, handleChange, handleSubmit, touched, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          fullWidth
                          name="id"
                          label="아이디"
                          variant="filled"
                          onChange={handleChange}
                          value={values.id}
                          error={Boolean(touched.id && errors.id)}
                          helperText={touched.id && errors.id}
                          InputLabelProps={{ shrink: true }}
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          name="password"
                          label="비밀번호"
                          variant="filled"
                          onChange={handleChange}
                          value={values.password}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item mb={2}>
                        <LoadingButton
                          type="submit"
                          style={{ background: '#27313e' }}
                          fullWidth
                          loading={isLoading}
                          variant="outlined"
                        >
                          {isLoading ? (
                            <CircularProgress size={24} style={{ color: 'white' }} />
                          ) : (
                            <Typography style={{ color: 'white' }}>로그인</Typography>
                          )}
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
            {/* <Grid item>
              <Link href="#" style={{float: "left"}}>
                개인 가입
              </Link>
              <Link href="#" style={{float: "right"}}>
                계정 찾기
              </Link>
            </Grid> */}
          </Paper>
        </Grid>
      </Box>
    </Container>
  );
};
export default LoginPage;
