import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { FormLabel } from 'react-bootstrap';
import { minWidth } from '@material-ui/system';
import { number } from 'prop-types';

const COUPANG = "coupang";
const SINDORIM = "sidorim";
const PRO = "0";
const PROMAX = "1";
const PROPRICE = 1350000;
const PROMAXPRICE = 1490000;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 50,
    minWidth: "700px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function TestPage() {

  

  const classes = useStyles();
  const [device, setDevice] = useState(PRO);
  const [market, setMarket] = useState(null);
  const [saleRatePlan, setSaleRatePlan] = useState("N");
  const [ratePlan, setRatePlan] = useState(0);

  const changeDevice = (e) => {
    setDevice(e.target.value);
  }

  const changeMarket = (e) => {
    setMarket(e.target.value);
  }

  const changeSale = (e) => {
    setSaleRatePlan(e.target.value);
    if(ratePlan > 0){
      if("Y" === e.target.value){
        setRatePlan(ratePlan * 0.75);
      }else if("Y" === saleRatePlan){
        setRatePlan(ratePlan / 3 * 4);
      }
    }
  }



  const calculateDevice = () => {
    let price = 0;
    if(device === PRO){
      price = PROPRICE;
    }else if(device === PROMAX){
      price = PROMAXPRICE;
    }

    if(price === 0) return false;

    if(market === COUPANG){
      price = price * 0.92;
    }else if(market === SINDORIM){
      if(device === PRO){
        price = 890000
      }else{
        price = 990000
      }

      if(saleRatePlan === "Y"){
        const additionalPrice = device === PRO ? 110000 : 150000;
        price += additionalPrice;
      }
    }

    

    return price;
  }

  const calculateRatePlan = () => {
    return Number(ratePlan) * 24;
  }



  const devicePrice = useMemo(() => calculateDevice(), [device, market, saleRatePlan]);
  const ratePlanPrice = useMemo(() => calculateRatePlan(), [ratePlan]);
  const totalPrice = useMemo(() => Number(devicePrice) + Number(ratePlanPrice), [devicePrice, ratePlanPrice]);


  return (
    <Paper className={classes.root}>
      <Typography variant="h2">아이폰 계산기</Typography> 
      <FormControl  component="fieldset">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel component="legend">기종</FormLabel>
            <RadioGroup row aria-label="position" name="device" onChange={changeDevice} value={device}>
              <FormControlLabel value={PRO} control={<Radio />} label="13 pro" />
              <FormControlLabel value={PROMAX} control={<Radio />} label="13 pro max" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">구매처</FormLabel>
            <RadioGroup row aria-label="position" name="market" onChange={changeMarket} value={market}>
              <FormControlLabel value={COUPANG} control={<Radio />} label="쿠팡" />
              <FormControlLabel value={SINDORIM} control={<Radio />} label="신도림" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">선약 유무</FormLabel>
            <RadioGroup row aria-label="position" name="sale" onChange={changeSale} value={saleRatePlan}>
              <FormControlLabel value="Y" control={<Radio />} label="유" />
              <FormControlLabel value="N" control={<Radio />} label="무" />
            </RadioGroup>
          </Grid>
          
          <Grid item xs={12}>
            <TextField label="요금제" type="number" variant="outlined"color="secondary" value={ratePlan} onChange={(e) => { setRatePlan(e.target.value) }}/>
          </Grid>
          
        </Grid>
      </FormControl>
      <Typography variant="h6">기기값 : {devicePrice} </Typography>
      <Typography variant="h6">요금제(24개월분) : {ratePlan} x 24 = {ratePlanPrice} </Typography>
      <Typography variant="h6">총합 : {totalPrice} </Typography>
      <Typography variant="h6">월 납부금 : {totalPrice / 24} </Typography>
    </Paper>
  );
}