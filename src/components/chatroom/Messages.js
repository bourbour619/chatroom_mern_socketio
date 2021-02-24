import {  Button, Grid, TextField, makeStyles, Paper, List, Typography, ListItem, ListItemText, Box } from '@material-ui/core'

import SendSharpIcon from '@material-ui/icons/SendSharp';
import React, { useState, useEffect, useCallback } from 'react'

import { useSocket } from '../../contexts/SocketContext'
import { useUser } from '../../contexts/UserContext'
import { useChatroom } from '../../contexts/ChatroomContext'

import moment from 'moment'

moment.locale('fa')


const useStyles = makeStyles((theme) => ({
    sendBtn: {
        margin: theme.spacing(2,'auto',0),
        height: 56,
        width: 120

    },
    messageHistory: {
        marginTop: theme.spacing(2),
        height: 600,
        borderColor: theme.palette.primary.main,
        overflow: 'auto',
        position: 'relative'
    },
    fromMe: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },
    fromOther: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
    fromRoom: {
        padding: theme.spacing(1),
        backgroundColor: 'black',
        color: 'white',
    },
    typingRecord: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        right: 0,
        textAlign: 'center',
        margin: theme.spacing(1),
        fontSize: '1.2rem',
        fontStyle: 'italic'
    }
}))

const Messages = ({room, roomName}) => {
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState('')
    const[otherTyping, setOtherTyping] = useState('')
    

    const {socket, setRoom} = useSocket()
    const [user, setUser] = useUser()
    const [chatrooms, setChatrooms] = useChatroom()


    const typeMessage= (e) => {
        setTyping(e.target.value)
        if(typing){
            socket.emit('set-me-typing', user.who)
        }
    }
    const newMessage = (e) => {
        e.preventDefault()
        if(typing){
            socket.emit('send-message', {
                who: user.who,
                text: typing
            })
        }
        setTyping('')
    }

    useEffect(() => {
        if(!socket) return
        socket.on('get-other-typing', (other) => {
            if(other.includes(user.who)){
                other = other.filter(o => o !== user.who)
            }
            if(other) setOtherTyping(other)
        })
        return () => socket.off('get-other-typing')
    })

    useEffect(() => setRoom(room) , [])
    
    useEffect(() => {
        if(!socket) return
        socket.on('welcome-message', (welcome) => {
            const initMessages = chatrooms.find(ch => ch.room === room)['messages']
            if(initMessages) setMessages(initMessages)
            const firstWelcome = messages.every(m => m !== welcome)
            if(firstWelcome){
                const { who, msg } = welcome
                setMessages([...messages, {
                    welcome: true,
                    who,
                    text: msg
                }])
            }
        })
        return () => socket.off('welcome-message')
    },[socket])

    useEffect(() => {
        if(!socket) return 
        socket.on('receive-message', ({who, text}) => {
            setMessages([...messages, {
                who,
                text
            }])
        })
        return () => socket.off('receive-message')
    })

    const goToLastMessage = useCallback((node) => {
        if(node){
            node.scrollIntoView({
                smooth: true
            })
        }
    },[])

    const classes = useStyles()
    
    return (
        <>
            <Grid 
                container 
                direction='column'
                justify='center'
                className='w-100'
                >
                <Grid item>
                    <Paper className={classes.messageHistory} variant='outlined' >
                        <List>
                            { messages ? messages.map((m,i) => {
                                const lastMessage = messages.length - 1 === i 
                                return (<ListItem key={i} className={`d-flex flex-column ${m.welcome 
                                                                                            ? 'align-items-center'
                                                                                            :  m.who === user.who  
                                                                                            ? 'align-items-start' 
                                                                                            : 'align-items-end'}`} >
                                    <Paper 
                                    elevation={3}
                                    className={m.welcome 
                                                ? classes.fromRoom
                                                : m.who === user.who  
                                                ? classes.fromMe 
                                                : classes.fromOther}
                                    >
                                        <ListItemText primary={m.welcome ? `${m.who} ${m.text}` : m.text} ref={ lastMessage ? goToLastMessage : null} />
                                    </Paper>
                                    <Box >
                                        <small className='text-muted font-italic'>{ `${m.welcome ? roomName : m.who} ` + moment().format('HH:mm').toString()}</small>
                                    </Box>
                                </ListItem>)
                            }): [] }
                        </List>
                        { otherTyping ? <Box className={classes.typingRecord}>
                            <small className='text-muted'>{otherTyping} در حال نوشتن</small>
                            </Box>
                        : '' }
                    </Paper>
                </Grid>
                <Grid item>
                        <form 
                            className='w-100 d-flex flex-row justify-content-between' 
                            noValidate 
                            onSubmit= {newMessage}
                            >
                                <TextField
                                        label='ارسال پیام'
                                        variant="outlined"
                                        margin="normal"
                                        autoFocus
                                        onChange= {typeMessage}
                                        className='w-75 mx-auto'
                                        value= { typing }
                                    />
                                    <Button 
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    endIcon={<SendSharpIcon/>}
                                    className={classes.sendBtn}
                                >
                                    ارسال
                                </Button>
                            </form>
                    </Grid>
            </Grid>
        </>
    )
}

export default Messages
