import React, { useState, useEffect } from 'react'

import { List, ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { useUser } from '../../contexts/UserContext'
import { useSocket } from '../../contexts/SocketContext'

const InRoom = ({room}) => {
    
    const { socket, setRoom } = useSocket()
    const [user, setUser] = useUser()
    const [presents, setPresents] = useState([])

    useEffect(() => setRoom(room) , [])
    
    useEffect(() => {
        socket.emit('user-joined', { who: user.who, room})
        return () => socket.emit('user-left', user.who)
    }, [socket])

    useEffect(() => {
        socket.on('get-users', (users) => {
            if(users) setPresents(users)
        })
        return () => socket.off('get-users')
    })

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
