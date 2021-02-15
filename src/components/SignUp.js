import React, { useState, useEffect, useRef } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { SnackBar, Alert } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory, Link as RouterLink } from 'react-router-dom'

import { registerUser } from '../contexts/UserContext'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [who, setWho] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')
  const [open, setOpen] = useState(false)
  const password2 = useRef()

  const classes = useStyles();

  const sendRegister = (e) => {
    e.preventDefault()
    if(password !== password2.current.value){
        setAlert('رمز عبور و تکرار آن مغایرت دارد')
    }
    const data = {
      username,
      email,
      who,
      password
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ثبت نام
        </Typography>
        <form className={classes.form} noValidate onSubmit={sendRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="نام کاربری"
                autoFocus
                onChange= {(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="آدرس ایمیل"
                name="email"
                autoComplete="email"
                onChange= {(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="who"
                label="نام مستعار"
                name="who"
                autoComplete="who"
                onChange= {(e) => setWho(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="رمزعبور"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange= {(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="تکرار رمز عبور"
                type="password"
                id="password2"
                autoComplete="current-password"
                ref = {password2}
                />
              </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ثبت نام
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to='/sign-in'>
                  آیا حساب کاربری دارید؟ وارد شوید
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {alert}
          </Alert>
      </Snackbar>
    </Container>
    
  );
}