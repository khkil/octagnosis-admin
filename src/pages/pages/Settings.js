import React from "react";
import styled from "styled-components/macro";
import { NavLink, Redirect } from "react-router-dom";

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
import { useSelector } from "react-redux";

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

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;


function Private() {
  const { data } = useSelector(state => state.authReducer);
  const { id, idx, username } = data;
  
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Private info
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="first-name"
              label="First name"
              variant="outlined"
              defaultValue={username}
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="last-name"
              label="Last name"
              variant="outlined"
              defaultValue="Lavender"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          defaultValue="lucylavender@gmail.com"
          fullWidth
          my={2}
        />

        <TextField
          id="address"
          label="Address"
          variant="outlined"
          fullWidth
          my={2}
        />

        <TextField
          id="address2"
          label="Apartment, studio, or floor"
          variant="outlined"
          fullWidth
          my={2}
        />

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              id="state"
              label="State"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              id="zip"
              label="Zip"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" mt={3}>
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function Settings() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        내 정보asd
      </Typography>


      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
