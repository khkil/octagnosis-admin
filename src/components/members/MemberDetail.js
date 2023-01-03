import React, { useEffect, useState } from 'react';
import {
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Alert,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FindAddressPopup from '../../components/common/FindAddressPopup';
import { phoneRegExp } from '../../utils';
import { updateMemberApi } from '../../api/memberApi';
import { useParams } from 'react-router-dom';

const MemberDetail = ({ memberDetail }) => {
  const { memberIdx } = useParams();
  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('이메일 형식에 맞게 입력하세요'),
    phone: Yup.string().matches(phoneRegExp, '휴대폰 번호 양식에 맞게 입력하세요'),
    // address: Yup.string().required('주소를 입력하세요'),
    // addressSub: Yup.string().required("상세주소를 입력하세요"),
    // school: Yup.string().required('학교명을 입력하세요'),
    // education: Yup.string().required('학력을 선택하세요'),
    // grade: Yup.string().required('학년을 입력하세요'),
    // major: Yup.string().required('전공을 입력하세요'),
    // job: Yup.string().required('직업을 입력하세요'),
    // company: Yup.string().required('회사를 입력하세요'),
    // jobDetail: Yup.string().required('업무 내용을 입력하세요'),
  });

  const showAddressPopup = e => {
    e.preventDefault();
    setOpenAddressPopup(true);
  };

  const handleSubmit = data => {
    updateMemberApi(memberIdx, data)
      .then(({ success }) => {
        if (Boolean(success)) {
          alert('수정되었습니다');
        } else {
          alert('수정에 실패하였습니다');
        }
      })
      .catch(e => {
        console.error(e);
      });
  };
  return (
    <Formik
      initialValues={memberDetail}
      validationSchema={validateSchema}
      onSubmit={data => {
        handleSubmit(data);
      }}
    >
      {({ values, setValues, handleChange, handleSubmit, touched, errors }) => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {errors.id}
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">기본정보</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="이메일"
                type="text"
                value={values.email}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                label="휴대전화"
                type="text"
                value={values.phone}
                onChange={handleChange}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                name="address"
                label="주소"
                type="text"
                value={values.address}
                onChange={handleChange}
                onClick={showAddressPopup}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  shrink: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FindAddressPopup
                open={openAddressPopup}
                setOpen={setOpenAddressPopup}
                onComplete={({ address }) => {
                  setValues({
                    ...values,
                    address: address,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="addressSub"
                label="상세주소"
                type="text"
                value={values.addressSub ? values.addressSub : ''}
                onChange={handleChange}
                error={Boolean(touched.addressSub && errors.addressSub)}
                helperText={touched.addressSub && errors.addressSub}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">현재 (최종) 학력 & 현재 직업 정보</Alert>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="school"
                label="학교명"
                type="text"
                value={values.school}
                onChange={handleChange}
                error={Boolean(touched.school && errors.school)}
                helperText={touched.school && errors.school}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                name="education"
                label="학력"
                value={values.education}
                onChange={handleChange}
                error={Boolean(touched.education && errors.education)}
                helperText={touched.education && errors.education}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value={'졸업'}>졸업</MenuItem>
                <MenuItem value={'재학'}>재학</MenuItem>
                <MenuItem value={'중퇴'}>중퇴</MenuItem>
                <MenuItem value={'수료'}>수료</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={1.5}>
              <TextField
                select
                fullWidth
                name="grade"
                label="학년"
                type="text"
                value={values.grade}
                onChange={handleChange}
                error={Boolean(touched.grade && errors.grade)}
                helperText={touched.grade && errors.grade}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <TextField
                fullWidth
                name="major"
                label="전공"
                type="text"
                value={values.major}
                onChange={handleChange}
                error={Boolean(touched.major && errors.major)}
                helperText={touched.major && errors.major}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="job"
                label="직업"
                type="text"
                value={values.job}
                onChange={handleChange}
                error={Boolean(touched.job && errors.job)}
                helperText={touched.job && errors.job}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="company"
                label="회사명"
                type="text"
                value={values.company}
                onChange={handleChange}
                error={Boolean(touched.company && errors.company)}
                helperText={touched.company && errors.company}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="jobDetail"
                label="업무 내용(업무에 대한 간단 서술)"
                type="text"
                value={values.jobDetail}
                onChange={handleChange}
                error={Boolean(touched.jobDetail && errors.jobDetail)}
                helperText={touched.jobDetail && errors.jobDetail}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item justifyContent="center">
              <Button type="submit" variant="contained">
                <Typography variant="h6">수정</Typography>
              </Button>
            </Grid>
          </Grid>

          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                이미 가입 하셨다면? <Typography variant="strong">로그인 하기</Typography>
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      )}
    </Formik>
  );
};

export default MemberDetail;
