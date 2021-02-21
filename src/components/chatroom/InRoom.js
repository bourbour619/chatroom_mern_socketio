import React, { useState } from 'react'

import { List, ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { useChatroom } from '../../contexts/ChatroomContext'

const InRoom = ({room}) => {
    
    const [chatrooms, setChatrooms] = useChatroom()
    
    const { users } = chatrooms.find(ch => ch.room === room)

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
                        { users ? users.map((user,i) => (
                            <ListItem key= {i} >
                                <AccountCircleRoundedIcon style= {{ color: '#3f51b5' }}/>
                                <ListItemText primary={user} className= 'mr-2' />
                            </ListItem>
                        )): [] }
                    </List>
              </Grid>
          </Grid>
        </>
    )
}

export default InRoom
