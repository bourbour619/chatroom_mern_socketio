import React, { useState, useEffect } from 'react'

import { Avatar, Container, Grid, makeStyles, Typography, Divider} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import Messages from './chatroom/Messages';
import InRoom from './chatroom/InRoom';

import { useParams } from 'react-router-dom'

import { useChatroom } from '../contexts/ChatroomContext'
import { useSocket } from '../contexts/SocketContext'
import { useUser } from '../contexts/UserContext'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: theme.spacing(5),
        maxWidth: '100vw',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    avatar: {
        color: theme.palette.primary.main
    },
    componentWrapper: {
        marginTop: theme.spacing(10),
        width: '100%'
    }
}))

const Chatroom = () => {
    const classes = useStyles()

    const [chatrooms, setChatrooms] = useChatroom()
    const { socket, setRoom } = useSocket()
    const [user, setUser] = useUser()
    
    const [roomName, setRoomName] = useState('')
    const [presents, setPresents] = useState([])
    const { room } = useParams()

    useEffect(() => {
        if(room && chatrooms){
            const { name } = chatrooms.find(ch => ch.room === room)
            setRoomName(name)
        }
    },[chatrooms])

    useEffect(() => setRoom(room))
    
    useEffect(() => {
        socket.emit('user-joined', user.who)
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
                        <Avatar className={classes.avatar}>
                            <ChatIcon />
                        </Avatar>
                    </Grid>
                    <Grid item className='mt-4'>
                        <Typography component="h1" variant="h5">چت روم {roomName}</Typography>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction='row'
                    justify='space-around'
                    spacing= {4}
                    className={classes.componentWrapper}
                >
                    <Grid item xs={8} >
                        <Messages room={room} roomName={roomName} presents={presents} />
                    </Grid>
                    <Divider orientation='vertical' flexItem light={true}  />
                    <Grid item xs={3}>
                        <InRoom presents={presents}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Chatroom