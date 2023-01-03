import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Grid,
  Paper as MuiPaper,
  Divider,
  Card,
  CardContent,
  TextField,
  Box,
  Typography
} from "@material-ui/core";
import {
  Delete, Save
} from "@material-ui/icons";
import { green, red } from '@material-ui/core/colors';

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import * as groupActions from "../../../redux/actions/groupActions";
import * as groupService from "../../../services/groupService";
import Loader from "../../../components/Loader";
import AlertDialog from "../../../components/common/dialogs/AlertDialog";
import AddressDialog from "../../../components/common/dialogs/AddressDialog";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("기관명을 입력하세요"),
});

const useStyles = makeStyles((theme) => ({
  
  button: {
    marginRight: 10,
  },
}));

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);


const GroupDetail = ({ initialGroup, history }) => {

  const classes = useStyles();
  const [showDialog, setShowDialog] = useState({
    delete: false,
    update: false
  });
  const [openAddressPopup, setOpenAddressPopup] = useState(false);

  const groupIdx = useMemo(() => initialGroup.idx, [initialGroup])

  const updateGroup = (values) => {
    groupService.updateGroup(groupIdx, values)
    .then(() => {
      setShowDialog({...showDialog, update: false});
      alert("수정에 성공하였습니다.");
    });
  }

  const deleteGroup = () => {
    
    groupService.deleteGroup(groupIdx)
    .then(() => {
      setShowDialog({...showDialog, update: false});
      alert("삭제에 성공하였습니다.");
      history.push(`/admin/groups`);
    });

  }

  return (
    <Card mb={6}>
      <CardContent>
        <Formik
          initialValues={initialGroup}
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
              <AlertDialog 
                title={"해당 기관을 삭제 하시겠습니까?"}
                desc={"삭제 후 복원 불가능합니다"}
                open={showDialog.delete} 
                onClose={() => { setShowDialog({...showDialog, delete: false}) }} 
                onConfirm={deleteGroup}
              />
              <AlertDialog 
                title={"수정 사항을 반영하시겠습니까?"}
                desc={"변경된 사항이 저장됩니다"}
                open={showDialog.update} 
                onClose={() => { setShowDialog({...showDialog, update: false}) }} 
                onConfirm={() => { updateGroup(values)}}
              />
              <Box pb={5}>
                <Typography variant="h6" gutterBottom>
                  기관정보
                </Typography>
              </Box>
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
              {/* <Grid
                justify="space-between" // Add it here :)
                container 
                spacing={24}
              >
                <Grid item/>
                <Grid item>
                  <div>
                    <Button raised color="accent">
                      Login
                    </Button>
                  </div>
                </Grid>
              </Grid> */}
              <Grid justify="space-between" container spacing={6} m={5}>
                <Grid item>
                  <Button variant="contained"color="primary" size="large" className={classes.button}>
                    회차코드 관리
                  </Button>
                </Grid>
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
                  저장
                </Button>
                <DeleteButton
                  variant="contained"
                  className={classes.button}
                  startIcon={<Delete/>}
                  onClick={() => { setShowDialog({...showDialog, delete: true}) }}
                >
                  삭제
                </DeleteButton>
                </Grid>
              </Grid>
            
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

const GroupCode = () => {

  return (
    <Card mb={6}>
      <CardContent>


      </CardContent>

    </Card>

  )
  

}

const AdminGroupDetail = ({ match, history }) => {
  
  const dispatch = useDispatch();
  const { loading, selected } = useSelector(state => state.groupReducer);

  useEffect(() => {
    const groupIdx = match.params.idx;
    dispatch(groupActions.getAdminGroupDetail(groupIdx));
  }, []);
  
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {selected && <GroupDetail initialGroup={selected} history={history}/>}
        </Grid>

        {/* <Grid item xs={12} md={4}>
          {selected && <Group initialGroup={selected}/>}
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default AdminGroupDetail;
