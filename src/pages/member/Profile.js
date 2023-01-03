import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, Redirect } from "react-router-dom";
import * as memberService from "../../services/memberService";

import * as types from "../../constants";

import Helmet from "react-helmet";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import { updateMember } from "../../redux/actions/memberActions";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;


const Profile = ({ history }) => {

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.authReducer);
  const { idx, id, password, name, email, phone } = data;

  const [form, setForm] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  };
  const onSubmit = () => {
    dispatch(updateMember(idx, form));
  }

  const member = useSelector(state => state.memberReducer);

  useEffect(() => {
    
    const isSuccess = Boolean(member.data && member.data.success);
    if(isSuccess){
      alert("정보수정에 성공하였습니다.");
      history.push("/");
    }
  }, [member])

  return (
    <React.Fragment>
      <Helmet title="Profile" />

      <Typography variant="h3" gutterBottom display="inline">
        내 정보da
      </Typography>

      <Divider my={6} />
      
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                내정보 수정
              </Typography>
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <TextField
                    disabled
                    name="id"
                    label="아이디"
                    variant="outlined"
                    defaultValue={id}
                    fullWidth
                    my={2}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    type="password"
                    name="password"
                    label="비밀번호"
                    variant="outlined"
                    defaultValue={password}
                    onChange={onChange}
                    fullWidth
                    my={2}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <TextField
                    name="name"
                    label="이름"
                    variant="outlined"
                    defaultValue={name}
                    onChange={onChange}
                    fullWidth
                    my={2}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    defaultValue={email}
                    onChange={onChange}
                    fullWidth
                    my={2}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={6}>
                <Grid item md={6}>
                  <TextField
                    id="city"
                    name="phone"
                    label="휴대폰번호"
                    variant="outlined"
                    defaultValue={phone}
                    onChange={onChange}
                    fullWidth
                    my={2}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="city"
                    name="phone"
                    label="휴대폰번호"
                    variant="outlined"
                    defaultValue={phone}
                    onChange={onChange}
                    fullWidth
                    my={2}
                  />
                </Grid>
              </Grid>

              <Button variant="contained" color="primary" mt={3} onClick={onSubmit}>
                확인
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
