import {  Button, Grid, TextField, makeStyles, Paper, List, Typography, ListItem, ListItemText, Box } from '@material-ui/core'

import SendSharpIcon from '@material-ui/icons/SendSharp';
import React, { useState, useEffect, useCallback } from 'react'

import { useSocket } from '../../contexts/SocketContext'
import { useUser } from '../../contexts/UserContext'
import { useChatroom } from '../../contexts/ChatroomContext'

import moment from 'moment'
import _ from 'lodash'

moment.locale('fa')


const useStyles = makeStyles((theme) => ({
    sendBtn: {
        margin: theme.spacing(2,'auto',0),
        height: 56,
        width: '15%'

    },
    messageHistory: {
        marginTop: theme.spacing(2),
        height: 700,
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
        // position: 'absolute',
        width: '100%',
        // bottom: 0,
        // right: 0,
        textAlign: 'center',
        margin: theme.spacing(1),
        fontSize: '1.2rem',
        fontStyle: 'italic'
    },
    messeageInput:{
        minWidth: '80%'
    }
}))

const Messages = ({room, roomName, presents}) => {
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState('')
    const[otherTyping, setOtherTyping] = useState('')
    

    const {socket, setRoom} = useSocket()
    const [user, setUser] = useUser()
    const [chatrooms, setChatrooms] = useChatroom()


    const typeMessage= (e) => {
        setTyping(e.target.value)
    }
    const newMessage = (e) => {
        e.preventDefault()
        if(typing){
            const time = moment().format('HH:mm').toString()
            socket.emit('send-message', {
                who: user.who,
                text: typing,
                time
            })
        }
        setTyping('')
    }

    useEffect(() => {
        if(!socket) return 
        if(typing !== ''){
            socket.emit('set-me-typing', user.who)
        } else {
            socket.emit('clear-me-typing', user.who)
        }
    })

    useEffect(() => {
        if(!socket) return
        socket.on('get-other-typing', (other) => {
            if(other.includes(user.who)){
                other = other.filter(o => o !== user.who)
            }
            if(other.length === 0) setOtherTyping([]) 
            if(other.length === 1) {
                setOtherTyping(other)
            }
            if(other.length > 1){
                other = other[0] + 'و ...'
                setOtherTyping(other)
            }
        })
        return () => socket.off('get-other-typing')
    })

    useEffect(() => setRoom(room) , [])

    
    useEffect(() => {
        const im = chatrooms.find(ch => ch.room === room)['messages']
        if(!_.isEqual(im, messages) && im){
            setMessages(im)
        }       
    },[])

    useEffect(() => {
        if(!socket) return
        let wm = {}
        socket.on('welcome-message', (who) => {
            const time = moment().format('HH:mm').toString()
            wm = { welcome: true, who, time }
            const fw = messages.every(m => !_.isEqual(m,wm))
            if(!fw) return
            if(messages){
                setTimeout(() => setMessages([...messages, wm]),1000)
            }else{
                setMessages([wm])
            }
        })
        return () => socket.off('welcome-message')
    },[socket])

    useEffect(() => {
        if(!socket) return
        socket.on('get-chatrooms', (chs) => {
            const im = chs.find(ch => ch.room === room)['messages']
            if(!_.isEqual(im, messages)){
                setMessages(im)
            }
        })
        return () => socket.off('get-chatrooms')
    },[socket])

    useEffect(() => {
        if(!socket) return 
        socket.on('receive-message', ({who, text, time}) => {
            setMessages([...messages, {
                who,
                text,
                time
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
                                        <ListItemText primary={m.welcome ? `${m.who} خوش آمدید` : m.text} ref={ lastMessage ? goToLastMessage : null} />
                                    </Paper>
                                    <Box >
                                        <small className='text-muted font-italic'>{ `${m.welcome ? roomName : m.who !== user.who ? m.who : 'شما'} ` + m.time}</small>
                                    </Box>
                                </ListItem>)
                            }): [] }
                        </List>
                    </Paper>
                    <Box className={classes.typingRecord}>
                            { otherTyping.length !== 0 ? 
                                <small className='text-muted'>
                                    {otherTyping} در حال نوشتن
                                </small>
                            : '' }
                        </Box>
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
                                        className= {classes.messeageInput}
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
