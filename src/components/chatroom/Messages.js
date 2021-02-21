import {  Button, Grid, TextField, makeStyles, Paper, List, Typography, ListItem, ListItemText, Box } from '@material-ui/core'

import SendSharpIcon from '@material-ui/icons/SendSharp';
import React, { useState, useEffect, useCallback } from 'react'

import { useSocket } from '../../contexts/SocketContext'
import { useUser } from '../../contexts/UserContext'

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

const Messages = ({room}) => {
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState('')

    const {socket, setRoom} = useSocket()
    const [user, setUser] = useUser()


    const typeMessage= (e) => {
        setTyping(e.target.value)
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

    useEffect(() => setRoom(room) , [])
    useEffect(() => {
        socket.on('welcome-message', ({welcome}) => {
            setMessages([...messages, {
                welcome: true,
                text: welcome
            }])
        })
    })

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
                                return (<ListItem key={i} className={`d-flex flex-column ${m.who === user.who || m.welcome ? 'align-items-start' : 'align-items-end'}`} >
                                    <Paper 
                                    elevation={3}
                                    className={m.who === user.who || m.welcome ? classes.fromMe : classes.fromOther}
                                    >
                                        <ListItemText primary={m.text} ref={ lastMessage ? goToLastMessage : null} />
                                    </Paper>
                                    <Box >
                                        <small className='text-muted font-italic'>{ `${m.who} ` + moment().format('HH:mm').toString()}</small>
                                    </Box>
                                </ListItem>)
                            }): [] }
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
