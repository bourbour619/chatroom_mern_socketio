import React from 'react'

import { List, ListItem, ListItemText, Grid, Typography, Divider, makeStyles } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles((theme) => ({
       noPresents: {
           color: 'white',
           backgroundColor: theme.palette.primary.main,
           borderRadius: '50%',
           minWidth: 40,
           minHeight: 40,
           display: 'inline-block',
           margin: theme.spacing(0,2)
       }
}))


const InRoom = ({presents}) => {
    
    const classes = useStyles()

    return (
        <>
          <Grid
            container
            direction= 'column'
            justify='center'
            className='w-100'
          >
              <Grid item>
                  <Typography className= 'text-center' variant='h6' component='h1'>
                        کاربران حاضر در روم
                        <div className={classes.noPresents}> {presents.length} </div>
                  </Typography>
              </Grid>
              <Divider className='my-4'/>
              <Grid item>
                    <List>
                        { presents ? presents.map((p,i) => (
                            <ListItem key= {i} >
                                <AccountCircleRoundedIcon style= {{ color: '#3f51b5' }}/>
                                <ListItemText primary={p} className= 'mr-2' />
                            </ListItem>
                        )): [] }
                    </List>
              </Grid>
          </Grid>
        </>
    )
}

export default InRoom
