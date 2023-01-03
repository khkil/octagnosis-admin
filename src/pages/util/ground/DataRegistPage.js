import React, { useCallback, useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestionList } from '../../../redux/actions/questionActions'
import { columnsTotalWidthSelector } from '@material-ui/data-grid'
import { Box, Button, Chip, Container, Grid } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getGroupList, registGroup } from '../../../redux/actions/groupActions'
import { registUserAnswers } from '../../../redux/actions/userActions'
import Loading from '../../../components/common/Loading'
import { DatePicker } from '@material-ui/pickers'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  input: {
    margin: 5,
    minWidth: 200,
  },
})

export const resultMap = {
  1: { title: '운동형' },
  2: { title: '관찰형' },
  3: { title: '분석형' },
  4: { title: '규범형' },
  5: { title: '진취형' },
  6: { title: '소통형' },
  7: { title: '실용형' },
  8: { title: '생명형' },
  9: { title: '제작형' },
  10: { title: '복합형' },
  11: { title: '원리형' },
  12: { title: '창조형' },
  13: { title: '추리형' },
  14: { title: '교육형' },
  15: { title: '봉사형' },
}

const UserForm = React.memo(({ user, setUser }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [groupForm, setGroupForm] = useState({})
  const [showGroupForm, setShowGroupForm] = useState(false)

  const toggleForm = () => {
    setShowGroupForm(!showGroupForm)
  }

  const handleChangeGroup = (e) => {
    const { name, value } = e.target
    setGroupForm({
      ...groupForm,
      [name]: value,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const onCreateGroup = () => {
    const { name } = groupForm
    if (!name) {
      alert('기관(학교명)명을 입력해주세요')
      return false
    }
    dispatch(registGroup(groupForm)).then(() => {
      if (groupReducer.error) {
        alert('등록시 오류 발생')
      } else {
        alert(`${name} 기관(학교명)이 등록되었습니다`)
        setShowGroupForm(false)
        setGroupForm({})
      }
    })
  }

  useEffect(() => {
    dispatch(getGroupList())
  }, [])

  const groupReducer = useSelector((state) => state.groupReducer)
  if (!groupReducer.data) return null
  return (
    <Grid item xs={12}>
      <Box style={{ padding: '20px' }}>
        {!user.group_idx && (
          <Button
            variant="contained"
            color={showGroupForm ? 'default' : 'primary'}
            onClick={toggleForm}
          >
            {showGroupForm ? '- 등록취소' : '+ 기관(학교명)등록'}
          </Button>
        )}
      </Box>

      {showGroupForm ? (
        <Box style={{ padding: '20px' }}>
          <TextField
            label="기관(학교명)명"
            margin="normal"
            name="name"
            onChange={handleChangeGroup}
            defaultValue={groupForm.name}
          />
          <br />
          <Button variant="contained" color="primary" onClick={onCreateGroup}>
            등록
          </Button>
        </Box>
      ) : (
        <Autocomplete
          options={groupReducer.data.filter((group) => group.name !== null)}
          getOptionLabel={(group) => group.name}
          name="group_idx"
          onChange={(event, value) => {
            const groupIdx = value ? value.idx : ''
            setUser({ ...user, group_idx: groupIdx })
          }}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="기관(학교명)" variant="outlined" />
          )}
        />
      )}
      <Grid container spacing={(6, 6)}>
        <Grid item xs={6}>
          <TextField
            name="user_grade"
            className={classes.input}
            type="number"
            label="나이(학년)"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="user_etc"
            className={classes.input}
            label="반"
            margin="normal"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="user_name"
            className={classes.input}
            label="이름"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="cdate"
            type="date"
            className={classes.input}
            label="시행일"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
})

const AnswersForm = React.memo(({ questions, answers, setAnswers }) => {
  const classes = useStyles()

  const handleChange = useCallback((e) => {
    const answerIdx = e.target.value
    const { question_idx } = e.target.dataset

    const values = answers.map((answer) => answer.question_idx)
    const index = values.indexOf(question_idx)
    const answer = {
      question_idx: question_idx,
      answer_idx: answerIdx,
    }

    if (index === -1) {
      setAnswers([...answers, answer])
    } else {
      const changedAnswers = [
        ...answers.filter((answer, x) => x !== index),
        answer,
      ]
      //changedAnswers.sort((a, b) => a.question_idx > b.question_idx ? 1 : -1);
      setAnswers(changedAnswers)
    }
  })

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="customized table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" width="10%">
              -
            </TableCell>
            <TableCell align="center">1번</TableCell>
            <TableCell align="center">2번</TableCell>
            <TableCell align="center">3번</TableCell>
            <TableCell align="center">4번</TableCell>
            <TableCell align="center">5번</TableCell>
            <TableCell align="center">6번</TableCell>
            <TableCell align="center">7번</TableCell>
            <TableCell align="center">8번</TableCell>
            <TableCell align="center">9번</TableCell>
            <TableCell align="center">10번</TableCell>
            <TableCell align="center">11번</TableCell>
            <TableCell align="center">12번</TableCell>
            <TableCell align="center">13번</TableCell>
            <TableCell align="center">14번</TableCell>
            <TableCell align="center">15번</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(resultMap).map((k, x) => {
            const questionList = questions.filter(
              (question) => question.resultIdx == k
            )
            return (
              <StyledTableRow key={x}>
                <StyledTableCell align="center" component="th" scope="row">
                  <Chip
                    size="small"
                    label={`문항 ${x + 1}  ${resultMap[x + 1].title}`}
                    color="primary"
                  />
                </StyledTableCell>
                {questionList.map((value, y) => (
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    key={y}
                  >
                    <TextField
                      size="medium"
                      inputProps={{
                        min: 1,
                        max: 5,
                        maxLength: 1,
                        'data-question_idx': value.questionIdx,
                      }}
                      onChange={handleChange}
                    />
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

const DataRegistPage = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [answers, setAnswers] = useState([])
  const [user, setUser] = useState({})

  const userReducer = useSelector((state) => state.userReducer)
  const { data, loading } = useSelector((state) => state.dataReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = {
      inspection_idx: 3,
      user_answers: answers,
      user_info: user,
    }
    console.log(params)
    if (confirm('등록하시겠습니까?')) {
      dispatch(registUserAnswers(params, history))
    }
  }

  useEffect(() => {
    console.log('userReducer', userReducer)
    const { data } = userReducer
    if (data && data.user_idx) {
      history.push(`/ground/users/${data.user_idx}`)
    }
  }, [userReducer])

  useEffect(() => {
    dispatch(getQuestionList(3))
  }, [])

  if (loading) return <Loading />
  if (!data || !data.questions) return null

  return (
    <Container maxWidth="lg">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <UserForm user={user} setUser={setUser} />
        <AnswersForm
          questions={data.questions}
          answers={answers}
          setAnswers={setAnswers}
        />

        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4} style={{ textAlign: 'center', paddingTop: '50px' }}>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                등록
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </form>
    </Container>
  )
}

export default DataRegistPage
