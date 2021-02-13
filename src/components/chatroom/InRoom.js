import React, { useState } from 'react'

import { List, ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const InRoom = () => {
    const [current, setCurrent] = useState([
        'محمدرضا بوربور', 'احمد علوی','شهنازی'
    ])
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
                  </Typography>
              </Grid>
              <Grid item>
                    <List>
                        { current ? current.map((c,i) => (
                            <ListItem key= {i} >
                                <AccountCircleRoundedIcon style= {{ color: '#3f51b5' }}/>
                                <ListItemText primary={c} className= 'mr-2' />
                            </ListItem>
                        )): [] }
                    </List>
              </Grid>
          </Grid>
        </>
    )
}

export default InRoom
