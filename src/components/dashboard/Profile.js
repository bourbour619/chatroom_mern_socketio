import React from 'react'

import { TextField, FormControlLabel, Checkbox, Button, Grid, Link, makeStyles } from '@material-ui/core'

import { useUser } from '../../contexts/UserContext'

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ذخیره
              </Button>
            </form>
        </>
    )
}

export default Profile
