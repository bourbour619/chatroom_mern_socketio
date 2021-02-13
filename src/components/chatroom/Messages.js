import {  Button, Grid, TextField, makeStyles, Paper, List, ListItem, ListItemText, Box } from '@material-ui/core'

import SendSharpIcon from '@material-ui/icons/SendSharp';
import React, { useState, useEffect, useRef } from 'react'

import { useLocation } from 'react-router-dom'

import { useSocket } from '../../contexts/SocketContext'

import moment from 'moment'

moment.locale('fa')


const useStyles = makeStyles((theme) => ({
    sendBtn: {
        margin: theme.spacing(2,0,0),
        height: 56,
        width: '25%'
    },
    messageHistory: {
        marginTop: theme.spacing(2),
        height: 600,
        borderColor: theme.palette.primary.main,
        overflow: 'auto'
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
    }
}))

const Messages = () => {
    const [messages, setMessages] = useState([])
    const [who, setWho] = useState(() => {
        return Math.floor((Math.random() * 100) + 1);
    })
    const [typing, setTyping] = useState('')
    
    const [socket, setId] = useSocket()

    const location = useLocation()

    let lastMessage = useRef()

    const typeMessage= (e) => {
        setTyping(e.target.value)
    }
    const newMessage = (e) => {
        e.preventDefault()
        if(typing){
            socket.emit('send-message', {
                who,
                text: typing
            })
        }
        setTyping('')
    }

    useEffect(() => {
        const id = location.pathname.split('/')[2]
        setId(id)
    },[location.pathname])

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

    useEffect(() => {
        if(lastMessage.current){
            lastMessage.current.scrollIntoView({
                smooth: true,
                block: 'end'
            })
        }
    },[lastMessage.current])

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
                            { messages ? messages.map((m,i) => 
                                (<ListItem key={i} className={`d-flex flex-column ${m.who === who ? 'align-items-start' : 'align-items-end'}`} >
                                    <Paper 
                                    elevation={3}
                                    className={m.who === who ? classes.fromMe : classes.fromOther}
                                    >
                                        <ListItemText primary={m.text} ref={messages.length -1 === i ? lastMessage: ''} />
                                    </Paper>
                                    <Box >
                                        <small className='text-muted font-italic'>{'شما ' + moment().format('HH:mm').toString()}</small>
                                    </Box>
                                </ListItem>)
                            ): [] }
                        </List>
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
                                        className='w-75'
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
