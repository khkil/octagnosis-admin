import React, { useCallback, useEffect, useState, memo } from 'react';
import { Box, Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/common/Loading';
import { getGroupList } from '../../../redux/actions/groupActions';
import { getUserAnswers, modifyUser, registUserAnswers } from '../../../redux/actions/userActions';
import { resultMap } from './DataRegistPage';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { AccountBox, CheckBox, LocalPrintshop } from '@material-ui/icons';
import { dateFormat } from '../../../utils/util';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
  },
  userInfo: {
    padding: "30px"
  },
  table: {
    minWidth: 700,
  },
  input: {
    margin: 5,
    minWidth: 200
  },
  rank1: {
    backgroundColor: "#fdcb4d",
    fontSize: "20px"
  },
  rank2: {
    backgroundColor: "#cec4c4",
    fontSize: "20px"
  }
  ,rank3: {
    backgroundColor: "#cd7f32",
    fontSize: "20px"
  },
  resultTable: {
    margin: "50px",
    maxWidth: "600px"
  },
  resultButton: {
    margin:"20px",
    minHeight: "100px",
  },
  modifyButton: {
    float: "right",
    margin: 20,
    padding: 20,
    minWidth: "8%"
  }
  
});

const UserForm = React.memo(({ userInfo, user, setUser }) => {

  const dispatch = useDispatch();
  const classes = useStyles();

  const { data } = useSelector(state => state.groupReducer);
  const { userName, userGrade, userEtc, cdate, groupIdx } = userInfo;
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  }

  useEffect(() => {
    console.log(userInfo);
    dispatch(getGroupList());
  }, [])
  
  
  if(!data) return null;
  return (

    <Grid item xs={12}>
      <Box style={{padding: "20px"}}>
        <Autocomplete
          options={data.filter(group => group.name !== null)}
          getOptionLabel={(group) => group.name}
          name="groupIdx"
          onChange={(event, value) => {
            const groupIdx = (value ? value.idx : "");
            setUser({...user, "groupIdx": groupIdx});
          }}
          style={{ width: 300 }}
          defaultValue={data.find(({ idx }) => idx == groupIdx)}
          renderInput={(params) =>
            <TextField {...params} 
              label="기관(학교명)" 
              variant="outlined" 
            />
          }
        />
      </Box> 
      <Grid container spacing={6, 6}>
        <Grid item xs={6}>
          <TextField 
            name="userGrade" 
            className={classes.input}
            type="number"
            label="나이(학년)"  
            margin="normal"
            defaultValue={userGrade}
            onChange={handleChange}
          />
          <TextField 
            name="userEtc"
            className={classes.input}
            label="반" 
            margin="normal"
            defaultValue={userEtc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            name="userName" 
            className={classes.input}
            label="이름"  
            margin="normal"
            defaultValue={userName}
            onChange={handleChange}
          />
          <TextField
            name="cdate" 
            type="date"
            className={classes.input}
            label="시행일"
            onChange={handleChange}
            defaultValue={dateFormat(cdate)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid> 
      </Grid>
    </Grid>
  )
})


const AnswersForm = React.memo (({ userAnswers, answers, setAnswers, userRank }) => {

  const classes = useStyles();

  const handleChange = useCallback(e => {
    const answerIdx = e.target.value;
    const { question_idx } = e.target.dataset;
    
    const values = answers.map(answer => answer.questionIdx);
    const index = values.indexOf(question_idx);
    const answer = {
      questionIdx: question_idx,
      answerIdx: answerIdx
    }

    if(index === -1){
      setAnswers([...answers, answer])
    }else{
      const changedAnswers = [...answers.filter((answer, x) => x !== index), answer];
      //changedAnswers.sort((a, b) => a.question_idx > b.question_idx ? 1 : -1);
      setAnswers(changedAnswers);
    }
  });

  if(!userRank) return null;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table" size="small"> 
        <TableHead>
          <TableRow>
            <TableCell align="center" width="10%">-</TableCell>
            {Array.from(Array(Object.keys(resultMap).length)).map((v, i) => (
              <TableCell align="center" width="5%" key={i}>
                <p style={{fontSize: "10px"}}>
                  {`${i + 1}번`}
                </p>
              </TableCell>  
            ))}
            <TableCell align="center" width="6%">총점</TableCell>
            <TableCell align="center" width="6%">순위</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(resultMap).map((k, x) => {
          const answerList = userAnswers.filter(answer => answer.result_idx == k);
          const { totalScore, rank } = userRank[k];
          return (
            <StyledTableRow key={x}>
              <StyledTableCell align="center" component="th" scope="row">
                <Chip
                  size="small"
                  label={`문항 ${x + 1}  ${resultMap[x + 1].title}`}
                  color="primary"
              />
              </StyledTableCell>
              {answerList.map(({ question_idx, answer_idx}, y) => (
                <StyledTableCell align="center" component="th" scope="row" key={y}>
                  <TextField 
                    size="medium" 
                    defaultValue={answer_idx ? answer_idx : 0}
                    InputProps={{ inputProps: { min: 1, max: 5, "data-question_idx": question_idx } }} 
                    onChange={handleChange}
                  />
                </StyledTableCell>
              ))}
              <StyledTableCell align="center" component="th" scope="row">
                <Typography variant="h6" >
                  {totalScore}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
              
                {rank < 4 ?
                  <Chip
                    size="medium"
                    mr={5}
                    mb={5}
                    label={rank}
                    className={classes[`rank${rank}`]}
                  /> :
                  <Typography variant="h6" className={classes[`rank${rank}`]}>
                    {rank}
                  </Typography>
                }
              </StyledTableCell>
            </StyledTableRow>
          )
        })}
        </TableBody> 
      </Table>
    </TableContainer>
  )
})

const PrintForm = memo(({ ranks, user }) => {

  const history = useHistory();
  const classes = useStyles();
  const [result, setResult] = useState(ranks)
  const [exceptedResults, setExceptedResults] = useState([]);

  const grades = [1,2,3];

  const handleChange = (e) => {
    const { value } = e.target;
    const resultIdx = parseInt(value);
    if(exceptedResults.indexOf(resultIdx) > -1){
      setExceptedResults(exceptedResults.filter(exceptedResult => exceptedResult !== resultIdx));
    }else{
      setExceptedResults([...exceptedResults, resultIdx]);
    } 
  }

  const goPrintPage = () => {
    
    const rank = Object.values(result.ranking).map(value => 
      value.filter(({ resultIdx }) => exceptedResults.indexOf(resultIdx) === -1)
    );
    history.push({
      pathname: "/ground/print",
      state: {
        user: user,
        rank: rank,
      }
    }) 
  }
  

  useEffect(() => {
    
    const topRanks = Object.values(ranks).filter(({ rank }) => rank <= 3);
    const ranking = topRanks.reduce((obj, topRank) => {
      const { rank } = topRank;
      const value = obj[rank];
      const values = !value? [topRank] : [...value, topRank];
      return {
        ...obj, 
        [rank] : values
      }
    }, {});
    const maxCount = Math.max(...Object.values(ranking).map(rank => rank.length));
    setResult({
      user: user,
      maxCount: maxCount,
      ranking: ranking
    })
  }, []);


  if(!result.ranking) return null;
  return (
    <>
      <Grid container>
        <Grid item xs={7}>
        <TableContainer component={Paper}>
          <Table className={classes.resultTable} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  <Alert severity="info">체크해제 한 성향은 프린트 페이지에 노출되지 않습니다.</Alert>
                  <br/>
                  최종순위
                </TableCell>
              </TableRow>
              <TableRow>
                {grades.map((grade, index) => (
                  <TableCell key={index} align="center">
                    {`${grade}순위`}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(result.maxCount), (e, x) => 
                <TableRow key={x}>
                  {Object.values(result.ranking).map((rank, y) => {

                    const resultIdx = rank[x] && rank[x].resultIdx;
                    return (
                      <TableCell key={y} align="center">
                        {resultIdx && 
                          <>
                            <Typography variant="h6">
                              <input type="checkbox" value={resultIdx} onChange={handleChange} checked={exceptedResults.indexOf(resultIdx) === -1}/>
                              {resultMap[resultIdx].title}  
                              
                            </Typography>
                          </>
                        }
                      </TableCell> 
                    )
                  })}  
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        <Grid item xs={5} style={{padding: "50px"}}>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.resultButton} 
            fullWidth 
            onClick={() => { history.push("/ground/regist") }}
          >
            <AccountBox/>
            <Typography variant="h4"> 등록하러 가기</Typography>
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.resultButton} 
            fullWidth 
            onClick={goPrintPage}
          >
            <LocalPrintshop/>
            <Typography variant="h4"> 프린트 하기</Typography>
          </Button>
        </Grid>
      </Grid>
   
    </>
  );
})



const DataDetailPage = ({ history, match }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState({userIdx: match.params.user_idx});
  const [rank, setRank] = useState({});

  const userReducer = useSelector(state => state.userReducer);
  const { data, loading, error } = userReducer;

  const getRank = useCallback(userAnswers => {

    console.log("get rank init")
    let result = {};
    let allScores = [];
    Object.keys(resultMap).forEach(key => {
      const answers = userAnswers.filter(({ result_idx }) => result_idx == key);
      const totalScore = answers.reduce((acc, { answer_idx }) => acc + (answer_idx ? answer_idx : 0), 0);
      if(!allScores.includes(totalScore)){
        allScores = allScores.concat(totalScore);
      } 
      result[key] = {
        totalScore: totalScore,
        resultIdx: parseInt(key)
      };
    });
    const sortedScore = allScores.sort((a, b) => b - a);

    Object.keys(result).forEach(key => {
      const { totalScore } = result[key];
      result[key].rank = sortedScore.indexOf(totalScore) + 1;
    })

    return result;
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { userIdx } = user;
    const params = {
      userAnswerList: answers,
      user: user
    };
    console.log(params);
    if(confirm("수정 하시겠습니까?")){
      dispatch(modifyUser(userIdx, params));
    }
  }

  useEffect(() => {
    const { user_idx } = match.params;
    dispatch(getUserAnswers(user_idx));
  }, []);

  useEffect(() => {

    const { user_idx } = match.params;
    if(data && data.answers){
      const rank = getRank(data.answers);
      setRank(rank);
    }else if(data && data.userIdx){
      dispatch(getUserAnswers(user_idx));
    }else if(error){
      alert("Server Error");
      dispatch(getUserAnswers(user_idx));
    }
    
  }, [userReducer])
  
  
  if(loading || (!data || !data.answers)) return <Loading/>;
  if(!data || !data.answers) return null;
  return (
    <Container maxWidth="lg">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <UserForm userInfo={data.user} user={user} setUser={setUser}/>
        {Object.keys(rank).length > 0 &&
        <>
          <AnswersForm userAnswers={data.answers} answers={answers} setAnswers={setAnswers} userRank={rank} />
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}/>
            <Grid item xs={4} style={{textAlign:"center", margin:"20px"}}>
              <Button variant="contained" color="primary" size="large" type="submit">
                수정
              </Button>
            </Grid>
            <Grid item xs={4}/>
          </Grid>
          <PrintForm ranks={rank} user={data.user}/>
        </>
        }
      </form>
    </Container>
  )
}

export default DataDetailPage;