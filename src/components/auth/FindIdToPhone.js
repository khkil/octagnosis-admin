import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { resetPassword } from "../../redux/actions/authActions";

import {
  Badge,
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { Box } from "react-feather";
import { timeFormat } from "../../utils/util"

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;
const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

const FindIdToPhone = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (e) => {
    alert('submit');
  }

  return (
    <Wrapper>
      <Helmet title="휴대폰으로 아이디 찾기" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        휴대폰으로 아이디 찾기
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        가입할때 입력하신 휴대폰 번호를 입력해주세요
      </Typography>

      <Formik
        initialValues={{
          phone: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string()
            .max(255)
            .required("휴대폰 번호를 입력해주세요")
            .matches(phoneRegExp, "- 을 포함해 정확한 형식으로 입력해주세요"),
        })}
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
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="phone"
              name="phone"
              label="휴대폰번호"
              value={values.phone}
              error={Boolean(touched.phone && errors.phone)}
              fullWidth
              helperText={touched.phone && errors.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Typography component="h6" style={{padding: "6px"}}>
                문자로 전송된 인증번호를 시간내로 입력해주세요 
                <Badge badgeContent={timeFormat("300")} color="error" variant="standard" style={{marginLeft: "1.2rem", padding: "1px"}}/>
            </Typography>
              
            <Button
              disabled={Boolean(!touched.phone || errors.phone)}
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
    </Wrapper>
  );
}

export default FindIdToPhone;
