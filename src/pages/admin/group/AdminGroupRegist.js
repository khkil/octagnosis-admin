import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper as MuiPaper,
  Paper,
  TextField,
  Typography,
 
} from "@material-ui/core";

import { green, orange } from "@material-ui/core/colors";

import {
  Add as AddIcon, Delete, Save,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import AddressDialog from "../../../components/common/dialogs/AddressDialog";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("기관명을 입력하세요"),
});

const useStyles = makeStyles((theme) => ({
  
  button: {
    marginRight: 10,
  },
  registForm: {
    marginTop: 10
  }
}));

const AdminGroupRegist = ({ match }) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();

  const [group, setGroup] = useState({
    name: "",
    tel: "",
    address: "",
    addressSub: "",
    contactName: "",
    contactEmail: "",
    contactTel: ""
  });
  const [openAddressPopup, setOpenAddressPopup] = useState(false);

  useEffect(() => {
  }, []);

  
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      

      <Grid container spacing={6}>
        <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
      </Grid>
      <Divider my={6} />
        <Grid item xs={12}>
          <Paper m={5}>

            <Formik
              initialValues={group}
              validationSchema={validationSchema}
            >
            {({
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
              values,
              setValues,
              status,
            }) => (
              <form>
                <Grid container spacing={6} m={5}>
                  <Grid item md={6}>
                    <TextField
                      name="name"
                      label="기관명"
                      value={values.name}
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="tel"
                      label="연락처"
                      value={values.tel}
                      error={Boolean(touched.tel && errors.tel)}
                      fullWidth
                      helperText={touched.tel && errors.tel}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} m={5}>
                  <Grid item md={6}>
                    <TextField
                      InputProps={{readOnly: true}}
                      name="address"
                      label="주소"
                      value={values.address}
                      error={Boolean(touched.address && errors.address)}
                      fullWidth
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onClick={() => setOpenAddressPopup(true)}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="addressSub"
                      label="상세주소"
                      value={values.addressSub}
                      error={Boolean(touched.addressSub && errors.addressSub)}
                      fullWidth
                      helperText={touched.addressSub && errors.addressSub}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                    
                </Grid>
                <Grid justify="space-between" container spacing={6} m={5}>
                  <Grid item>
                  <Button variant="contained" color="default" size="small" className={classes.button} onClick={() => setOpenAddressPopup(true)}>
                    주소찾기
                  </Button>
                  <AddressDialog 
                    open={openAddressPopup}
                    setOpen={setOpenAddressPopup}
                    onComplete={data => { 
                      let { address, buildingName } = data;
                      if(buildingName){
                        address += ` (${buildingName})`;
                      }
                      setValues({
                        ...values,
                        address: address
                      });
                    }}
                    
                  />
                  </Grid>
                </Grid>
                <Grid container spacing={6} m={5}>
                  <Grid item md={4}>
                    <TextField
                      name="contactName"
                      label="담당자명"
                      value={values.contactName}
                      error={Boolean(touched.contactName && errors.contactName)}
                      fullWidth
                      helperText={touched.contactName && errors.contactName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      name="contactTel"
                      label="담당자 연락처"
                      value={values.contactTel}
                      error={Boolean(touched.contactTel && errors.contactTel)}
                      fullWidth
                      helperText={touched.contactTel && errors.contactTel}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      name="contactEmail"
                      label="담당자 이메일"
                      value={values.contactEmail}
                      error={Boolean(touched.contactEmail && errors.contactEmail)}
                      fullWidth
                      helperText={touched.contactEmail && errors.contactEmail}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Grid justify="space-between" container spacing={6} m={5}>
                  <Grid item/>
                  <Grid item>
                    <Button
                      onClick={() => {
                        console.log(values);
                      }}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<Save/>}
                      onClick={() => { setShowDialog({...showDialog, update: true}) }}
                    >
                      등록
                    </Button>
                  </Grid>
                </Grid>
              
              </form>
            )}
          </Formik>
       
          </Paper>

        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AdminGroupRegist;
