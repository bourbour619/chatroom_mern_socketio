import React from 'react'

import { TextField, FormControlLabel, Checkbox, Button, Grid, Link, makeStyles } from '@material-ui/core'

import { useUser } from '../../contexts/UserContext'

const useStyles = makeStyles((theme) => ({
    form: {
        width: '20vw', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}))

const Profile = () => {

    const classes = useStyles()

    const [user, setUser] = useUser()

    return (
        <>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                disabled
                fullWidth
                id="username"
                label="نام کاربری"
                name="username"
                autoComplete="username"
                autoFocus
                value={user.username}
                inputProps={{ style: {
                  fontSize: 14
                }}}
                InputLabelProps={{
                  style: {
                    fontSize: 14
                  }
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="who"
                label="نام مستعار در چت روم"
                name="who"
                autoComplete="who"
                autoFocus
                value={user.who}
                inputProps={{ style: {
                  fontSize: 14
                }}}
                InputLabelProps={{
                  style: {
                    fontSize: 14
                  }
                }}
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
                inputProps={{ style: {
                  fontSize: 14
                }}}
                InputLabelProps={{
                  style: {
                    fontSize: 14
                  }
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="تکرار رمز عبور"
                type="password"
                id="password2"
                autoComplete="current-password"
                inputProps={{ style: {
                  fontSize: 14
                }}}
                InputLabelProps={{
                  style: {
                    fontSize: 14
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.submit}
                size="small"
              >
                ذخیره
              </Button>
            </form>
        </>
    )
}

export default Profile
