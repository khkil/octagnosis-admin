import React, { useEffect } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import { Alert as MuiAlert } from "@material-ui/lab";

import { spacing } from "@material-ui/system";

import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getMemberDetail } from "../../../redux/actions/memberActions";
import { updateMember } from "../../../services/memberService";
import MenuBar from "../../../components/MenuBar";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

/* const initialValues = {
  id: "Lucy",
  password: "Lavender",
  email: "lucylavender@gmail.com",
  password: "mypassword123",
  phone: "mypassword123",
}; */

const validationSchema = Yup.object().shape({
  id: Yup.string().required("필수입력 값 입니다"),
  password: Yup.string().max(255).required("필수입력 값 입니다"),
  email: Yup.string().email("이메일 형식에 맞게 입력하세요").required("필수입력 값 입니다"),
  phone: Yup.string().required("필수입력 값 입니다"),
});

/* function BasicForm() {
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Formik
            </Typography>
            <Typography variant="body2" gutterBottom>
              Formik example with Yup validation
            </Typography>

            {status && status.sent && (
              <Alert severity="success" my={3}>
                [DEMO] Your data has been submitted successfully!
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="id"
                      label="First Name"
                      value={values.id}
                      error={Boolean(touched.id && errors.id)}
                      fullWidth
                      helperText={touched.id && errors.id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="password"
                      label="Last Name"
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>

                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                  my={2}
                />

                <TextField
                  name="password"
                  label="Password"
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  my={2}
                />

                <TextField
                  name="phone"
                  label="Confirm password"
                  value={values.phone}
                  error={Boolean(
                    touched.phone && errors.phone
                  )}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  my={2}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={3}
                >
                  Save changes
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
 */
const AdminMemberDetail = ({ match }) => {
  const dispatch = useDispatch();
  const { idx } = match.params;
  const { data } = useSelector(state => state.dataReducer);
  
  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    console.log(values);
    try {
      await timeOut(500);
      updateMember(idx, values);
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getMemberDetail(idx));
  },[])

  if(!data || !data.memberDetail) return null;
  return ( 
    <React.Fragment>
      <Helmet title="Formik" />
      <MenuBar match={match}/>

      <Divider my={6} />

      <Formik
        initialValues={data.memberDetail}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {values.name} 님의 회원정보
            </Typography>
          

            {status && status.sent && (
              <Alert severity="success" my={3}>
                회원정보 수정에 성공하였습니다.
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="id"
                      label="아이디"
                      value={values.id}
                      error={Boolean(touched.id && errors.id)}
                      fullWidth
                      helperText={touched.id && errors.id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={true}
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="password"
                      label="비밀번호"
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="email"
                      label="E-mail"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="phone"
                      label="휴대전화"
                      value={values.phone}
                      error={Boolean(
                        touched.phone && errors.phone
                      )}
                      fullWidth
                      helperText={touched.phone && errors.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={3}
                >
                  수정
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>

      
    </React.Fragment>
  );
}

export default AdminMemberDetail;


