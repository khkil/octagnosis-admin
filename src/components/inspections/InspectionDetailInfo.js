import React from 'react';
import { Button, TextField, Grid, Box, Alert, MenuItem, Paper } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validateSchema = {
  inspectionName: Yup.string().required('검사명을 입력하세요'),
};

const InspectionDetailInfo = ({ inspectionDetail }) => {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <Formik
      initialValues={inspectionDetail}
      validationSchema={Yup.object().shape(validateSchema)}
      onSubmit={data => {
        handleSubmit(data);
      }}
    >
      {({ values, setValues, handleChange, handleSubmit, touched, errors }) => (
        <Box component="form" onSubmit={handleSubmit} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">기본정보</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="inspectionName"
                label="검사명"
                type="text"
                value={values.inspectionName}
                onChange={handleChange}
                error={Boolean(touched.inspectionName && errors.inspectionName)}
                helperText={touched.inspectionName && errors.inspectionName}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="rankCount"
                type="number"
                label="결과지 결과 갯수"
                value={values.rankCount}
                onChange={handleChange}
                error={Boolean(touched.rankCount && errors.rankCount)}
                helperText={touched.rankCount && errors.rankCount}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="showYn"
                label="결제 여부"
                type="text"
                value={values.showYn}
                onChange={handleChange}
                error={Boolean(touched.showYn && errors.showYn)}
                helperText={touched.showYn && errors.showYn}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Y">유료검사</MenuItem>
                <MenuItem value="N">무료검사</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="showYn"
                label="표시 여부"
                type="text"
                value={values.showYn}
                onChange={handleChange}
                error={Boolean(touched.showYn && errors.showYn)}
                helperText={touched.showYn && errors.showYn}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Y">표시</MenuItem>
                <MenuItem value="N">숨김</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">기타정보</Alert>
            </Grid>
          </Grid>
          <Grid style={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: '#27313e', height: '52px' }}
            >
              수정
            </Button>
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default InspectionDetailInfo;
