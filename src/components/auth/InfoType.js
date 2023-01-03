import React, { useEffect, useState } from 'react';
import { Box, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from "yup";
import { padding } from 'polished';
import { useDispatch, useSelector } from 'react-redux';
import { findId } from '../../redux/actions/authActions';
import AuthLoader from '../../components/common/AuthLoader';
import { useHistory } from 'react-router';
import FindResult from './FindResult';


const InfoType = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const useStyles = makeStyles({
    root: {
      padding: '30px'
    },
    text: {
      marginBottom: '10px',
    },
    error_text: {
      color: '#f44336' 
    },
    submit_btn: {
      marginTop: "10px"
    }
  });
  const classes = useStyles();

  const initialValues = {
    name: '',
    email: ''
  }
  const validationSchema = {
    name: Yup.string().required("이름을 입력하세요"),
    email: Yup.string().email("이메일 형식에 맞게 입력 해주세요").max(255).required("이메일을 입력하세요"),
  }
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const auth = useSelector(state => state.authReducer);
  const { data, loading, error } = auth;
  const onSubmit = (crenditials) => {
    dispatch(findId(crenditials, type));
  }

  useEffect(() => {
    if(data && data.success){

    }else if(error){
      setShowErrorMsg(true);
    }
  }, [auth]);

  return (
    <>
    <Paper className={classes.root}>
      {data && data.success ? <FindResult/> : 
      <>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          <Box p={4}>이름, 이메일로 찾기</Box>
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          가입시 입력한 이름, 이메일 주소를 입력해주세요.
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape(validationSchema)}
          onSubmit={onSubmit}
        >

        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              type="name"
              name="name"
              label="이름"
              className={classes.text}
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setShowErrorMsg(false);
              }}
              my={2}
            />
            <TextField
              type="email"
              name="email"
              label="이메일"
              className={classes.text}
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setShowErrorMsg(false);
              }}
              my={2}
            />
            <AuthLoader loading={loading}></AuthLoader>{/* 
            { Boolean(error && showErrorMsg) && <p className={classes.error_text}>{error.msg}</p> } */}
            <p className={classes.error_text}></p>
            <Button
              className={classes.submit_btn}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              확인
              
            </Button>
          </form>
        )}


        </Formik>

      </>
      }

      
    </Paper>
    </>
  );
}

export default InfoType;