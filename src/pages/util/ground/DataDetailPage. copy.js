import React, { useEffect, useState, memo, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionList } from '../../../redux/actions/questionActions';
import { columnsTotalWidthSelector } from '@material-ui/data-grid';
import { Badge, Box, Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getGroupList, registGroup } from '../../../redux/actions/groupActions';
import { getUserAnswers, registUserAnswers } from '../../../redux/actions/userActions';
import { resultMap } from './DataRegistPage';
import { X } from 'react-feather';
import { AccountBox, CheckBox, LocalPrintshop } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/common/Loading';
import Checkbox from '@material-ui/core/Checkbox'
import { Alert } from '@material-ui/lab';

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
    maxWidth : "1600px"
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


const ResultTable = ({ ranks, user }) => {

  const history = useHistory();
  const classes = useStyles();
  const [exceptedResults, setExceptedResults] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    const result = value;
    if(exceptedResults.indexOf(value) > -1){
      setExceptedResults(exceptedResults.filter(exceptedResult => exceptedResult !== result));
    }else{
      setExceptedResults([...exceptedResults, result]);
    }
  }

  const goPrintPage = () => {

    Object.keys(results).forEach(key => {
      const result = results[key].filter(value => {
        const { resultIdx } = value;
        return exceptedResults.indexOf(resultIdx) === -1;
      })
      results[key] = result;
    })
    
    history.push({
      pathname: "/ground/print",
      state: {
        user: user,
        results: results,
        maxCount: maxCount,
        grades: grades
      }
    }) 
  }

  let results = new Object();
  const grades = [1,2,3];
  grades.forEach(grade => {
    let result = [];
    Object.keys(ranks).forEach(key => {
      const { ranking }  = ranks[key];
      ranks[key].resultIdx = key;
      if(grade === ranking){
        result = [...result, ranks[key], ];
      }
    });
    results[grade] = result;
  });

  let maxCount = 0;
  Object.keys(results).forEach(key => {
    const count = results[key].length;
    if(count > maxCount){
      maxCount = count;
      return;
    }
  });

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
              {Array.from(Array(maxCount), (e, x) => 
                <TableRow key={x}>
                  {grades.map((grade, y) => {
                    const result = results[grade];
                    const resultIdx = result[x] ? result[x].resultIdx : null;
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
}

const UserInfo = memo(({ user, userInfo, setUserInfo }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const { userName, userGrade, userEtc, groupIdx, cdate } = user;

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  })
  useEffect(() => {
    dispatch(getGroupList());
  }, [groupReducer]);

  const groupReducer = useSelector(state => state.groupReducer);
  const { data, error } = groupReducer;  
  
  if(!data) return null;
  return (
    <Grid item xs={12} className={classes.userInfo}>
      
      <Autocomplete
        name="group_idx"
        options={data}
        getOptionLabel={(group) => group.name}
        defaultValue={data.find(group => group.idx === groupIdx)}
        onChange={(e, v) => { 
          const value = (v ? v.idx : "");
          setUserInfo({
            ...userInfo,
            "group_idx": value
          })
        }}
        style={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params} 
            label="기관(학교명)" 
            variant="outlined" 
          />
        }
      />
      <Grid container spacing={6, 6}>
        <Grid item xs={6}>
          <TextField 
            name="user_grade" 
            type="number"
            className={classes.input}
            label="나이(학년)"  
            margin="normal"
            onChange={handleChange}
          />
          <TextField 
            name="user_etc"
            className={classes.input}
            label="반" 
            defaultValue="normal"
            value={userEtc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            name="user_name" 
            className={classes.input}
            label="이름"  
            margin="normal"
            defaultValue={userName}
            onChange={handleChange}
          />
          <TextField 
            name="user_date" 
            className={classes.input}
            label="시행일"  
            margin="normal"
            value={cdate}
            onChange={handleChange}
          />
        </Grid> 
        {JSON.stringify(userInfo)}
      </Grid>
    </Grid>
  );
});



const DataDetailPage = ({ history, match }) => {

  const classes = useStyles();
  
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer);
  const { user_idx } = match.params;
  const { data, loading } = userReducer;
  const existData = (data && data.questions && data.answers);

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    
    if(!existData)
    dispatch(getUserAnswers(user_idx));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirm("등록하시겠습니까?")){
      dispatch(registUserAnswers())
      .then(() => {
        const { data } = userReducer.data;
        if(data){
          const { user_idx } = data;
          history.push(`/ground/users/${user_idx}`);
        }
      });
    }
  }

  const goModifyPage = () => {
    history.push(`/ground/modify/users/${user_idx}`);
  }

  const getQuestions = (questions) => {
  
    let result = new Object();
    questions.forEach(question => {
      const key = question.resultIdx;
      question.answer_idx = "test";
      if(!result[key]){
        result[key] = [question];
      }else{
        result[key] = [...result[key], question];
      }
      
    });
    return result;
  }


  const getAnswer = (answers) => {
    let map = {};
    answers.forEach(answer => {
      const { question_idx, answer_idx } = answer;
      map[question_idx] = answer_idx
    })
    return map;
  }

  const getRank = (questions, answers) => {

    let ranks = {};
    let scoreValues = [];
    const answerMap = getAnswer(answers);
    Object.keys(questions).forEach(key => {
      const scoreList = questions[key].map(question => {
        const { questionIdx } = question;
        const score = answerMap[questionIdx] ? answerMap[questionIdx] : 0;
        return score;
      });
      const totalScore = scoreList.reduce((a, b) => a + b);
      const info = {
        totalScore: totalScore,
      }
      ranks[key] = info;
      if(scoreValues.indexOf(totalScore) === -1){
        scoreValues = [...scoreValues, totalScore];
      }
    });

    const sortedValues = scoreValues.sort((a, b) => a - b);
    Object.keys(ranks).map(x => {
      let rank = ranks[x];
      const { totalScore } = rank;
      rank.ranking = sortedValues.length - sortedValues.indexOf(totalScore);
      return rank;
    });
    return ranks;
  }


  if(loading) return <Loading/>;
  if(!existData) return null;

  const { user, answers } = data;
  const questions = getQuestions(data.questions);
  const rank = getRank(questions, answers);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      
        <UserInfo user={user} setUserInfo={setUserInfo} userInfo={userInfo} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table" size="small"> 
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">-</TableCell>
                {Object.keys(questions).map((key, x) => {
                  const question = questions[key];
                  return (
                    <TableCell key={x} align="center" width="5%">
                      {`${x + 1}번`}
                    </TableCell>
                  )
                })}
                <TableCell align="center" width="5%">총점</TableCell>
                <TableCell align="center" width="7%">성향 순위</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(questions).map((key, x) => {
                
                const question = questions[key];
                const { totalScore, ranking } = rank[key];
                return (
                  <StyledTableRow key={x}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Chip
                        size="small"
                        label={`문항 ${x + 1}  ${resultMap[x + 1].title}`}
                        color="primary"
                    />
                    </StyledTableCell>
                    {question.map((value, y) => {
                      
                      const answer = getAnswer(answers);
                      const answerValue = answer[value.questionIdx];
                      return (
                        <StyledTableCell align="center" component="th" scope="row" key={y}>
                          <TextField 
                            size="medium" 
                            type="number" 
                            InputProps={{ inputProps: { min: 1, max: 5, style: {textAlign: 'center'} } }} 
                            value={answerValue}
                            onChange={(e) => {
                              const { question_idx } = value;
                              const answer_idx = e.target.value;
                            }}
                          />
                        </StyledTableCell>
                      )
                    })}
                    <StyledTableCell align="center" component="th" scope="row">
                      <Typography variant="h6" >
                        {totalScore}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                    
                      {ranking < 4 ?
                        <Chip
                          size="medium"
                          mr={5}
                          mb={5}
                          label={ranking}
                          className={classes[`rank${ranking}`]}
                        /> :
                        <Typography variant="h6" className={classes[`rank${ranking}`]}>
                          {ranking}
                        </Typography>
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <ResultTable ranks={rank} user={user}/>
      </form>
    </Container>
  )
}

export default DataDetailPage;