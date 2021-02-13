import {  Button, Grid, TextField, makeStyles, Paper, List, ListItem, ListItemText, Box } from '@material-ui/core'

import SendSharpIcon from '@material-ui/icons/SendSharp';
import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { useSocket } from '../../contexts/SocketContext'


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
    }
}))

const Messages = () => {
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState('')
    
    const [socket, setId] = useSocket()

    const location = useLocation()

    const typeMessage= (e) => {
        setTyping(e.target.value)
    }
    const newMessage = (e) => {
        e.preventDefault()
        if(typing){
            socket.emit('send-message', typing )
        }
        console.log(socket)
        setTyping('')
    }

    useEffect(() => {
        const id = location.pathname.split('/')[2]
        setId(id)
    },[location.pathname])

    useEffect(() => {
        if(!socket) return 
        socket.on('receive-message', (text) => {
            setMessages([...messages, text])
            console.log(messages)
        })
        return () => socket.off('receive-message')
    })

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
                                (<ListItem key={i} className='d-flex flex-column align-items-start'>
                                    <Paper 
                                    elevation={3}
                                    className={classes.fromMe}
                                    >
                                        <ListItemText primary={m} />
                                    </Paper>
                                    <Box >
                                        <small className='text-muted font-italic'>شما</small>
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
