import React, { useEffect } from 'react';
import queryString from "query-string";
import { Redirect } from 'react-router';
import { Paper, styled, Typography, FormControl, Button, Box, Grid } from '@material-ui/core';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import InfoType from '../../components/auth/InfoType';
import FindIdToPhone from '../../components/auth/FindIdToPhone';

const FindId = ({ location }) => {
  const query = queryString.parse(location.search);
  const { type } = query;
  
  const Wrapper = styled(Paper)`
    padding: 10px;
  }`;

  const style = {
    padding: '30px',
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return(
    
    <>
      {
        type === "phone" ? 
          <FindIdToPhone/>
        : type === "info" ? 
          <InfoType type={type}/>
        : <Redirect to="/"/>
      }
    </>
  )
}

export default FindId;