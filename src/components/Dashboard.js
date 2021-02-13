
import React from 'react'

import { Avatar, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Profile from './dashboard/Profile';
import Join from './dashboard/Join';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: theme.spacing(15),
        maxWidth: '100vw',
    },
    avatar: {
        color: theme.palette.secondary.light
    },
    componentWrapper: {
        marginTop: theme.spacing(10),
        width: '100%',
        margin: 'auto'
    }
}))

const Dashboard = () => {
    
    const classes = useStyles()

    return (
        <>
            <Container
              component='main' 
              className={classes.wrapper}
              >
                <Grid
                    container 
                    direction='column'
                    justify='center'
                    alignItems='center'
                    >
                    <Grid item>
                        <Avatar className={classes.avatar} >
                            <AccountCircleIcon />
                        </Avatar>
                    </Grid>
                    <Grid item className='mt-4'>
                        <Typography component="h1" variant="h5">
                            محمدرضا بوربور
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction='row'
                    justify='space-around'
                    alignItems='baseline'
                    spacing={3}
                    className={classes.componentWrapper}
                    >
                    <Grid
                        container
                        item
                        direction='column'  
                        justify='center'
                        alignItems='center'
                        xs={5}
                        spacing={3}
                        >
                        <Grid item>
                            <Typography>ویرایش پروفایل</Typography>
                        </Grid>
                        <Grid item>
                            <Profile />
                        </Grid>
                    </Grid>
                        <Divider orientation='vertical' flexItem light={true}  />
                    <Grid
                        container
                        item
                        direction='column'  
                        justify='center'
                        xs={5}
                        spacing={3}
                        >
                        <Grid item>
                                <Typography className='text-center'>چت روم ها</Typography>
                        </Grid>
                        <Grid item>
                                <Join />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Dashboard