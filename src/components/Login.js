import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import  Snackbar  from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useUser } from '../contexts/UserContext'
import { loginRoute } from '../config/api'

import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom'
import { setCookie, getCookie } from '../config/cookie'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}


export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [alert, setAlert] = useState({})
  const [open, setOpen] = useState(false)

  const [user, setUser] = useUser()

  const classes = useStyles();
  
  const history = useHistory()

  const query = useQuery()

  useEffect(() => {
    const qUserName = query.get('username')
    if(qUserName) setUsername(qUserName)
    let ckLogin = getCookie('ck_login')
    if(ckLogin){
      ckLogin = ckLogin.split('|')
      setUsername(ckLogin[0])
      setPassword(ckLogin[1])
    }

  },[])

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const sendLogin = async(event) => {
    event.preventDefault()
    const data = { username, password }
    if(rememberMe){
      setCookie('ck_login', `${username}|${password}`, 1, 'login')
    }
    loginRoute(data, (auth, data) => {
        if(!auth){
          setAlert({
            msg: 'نام کاربری یا رمز عبور اشتباه است',
            type: 'error'
          })
          setOpen(true)
        } else {
          setUser(data)
          setAlert({
            msg: data.msg,
            type: 'success'
          })
          setOpen(true)
          setTimeout(() => {
            history.push('/dashboard')
          },2000)
        }
    })
  }


  return (
    <div className= {classes.wrapper}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ورود
            </Typography>
            <form className={classes.form} noValidate onSubmit={sendLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value= {username}
                id="username"
                label="نام کاربری"
                name="username"
                autoComplete="username"
                autoFocus
                onChange = {(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="رمز عبور"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="rememberMe" color="primary" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} />}
                label="مرا به خاطر بسپار"
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ورود
              </Button>
              <Grid container justify='space-between'>
                <Grid item >
                  <Link href="#" variant="body2">
                    رمز عبور را فراموش کرده‌اید؟‌
                  </Link>
                </Grid>
                <Grid item>
                  <RouterLink to='/register'>
                    "حساب کاربری ندارید؟ ثبت نام کنید"
                  </RouterLink>
                </Grid>
              </Grid>
            </form>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity={alert.type}>
            {alert.msg}
          </Alert>
      </Snackbar>
      </Container>
    </div>
  );
}