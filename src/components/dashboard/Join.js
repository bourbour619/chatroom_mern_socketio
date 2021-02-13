import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, FormControl, InputLabel, MenuItem, makeStyles, Select, Grid } from '@material-ui/core'

import { useChatroom } from '../../contexts/ChatroomContext'


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
  }));

const Join = () => {
    
    const history = useHistory()
    const chatrooms = useChatroom()
    const [chosen, setChosen]= useState('')

    const classes = useStyles()
    
    const chatroomChoosed = (event) => {
        setChosen(event.target.value)
    }

    const joinChatroom = (event) => {
        if(chosen){
            history.push(`/chatroom/${chosen}`)
        }
    }
    
    return (
        <>
            <form noValidate className={classes.form} onSubmit={joinChatroom}>
                        <FormControl fullWidth variant="outlined" color='secondary' className={classes.formControl}>
                        <InputLabel id="chatroom-select-label">چت روم</InputLabel>
                            <Select
                            labelId="chatroom-select-label"
                            id="chatroom-select"
                            value={chosen}
                            onChange={chatroomChoosed}
                            label="چت روم"
                            className='w-100'
                            >
                                <MenuItem value="">
                                    <em>هیچکدام</em>
                                </MenuItem>
                                {chatrooms ? chatrooms.map(chr => (
                                    <MenuItem key= {chr.id} value={chr.id}>{chr.name}</MenuItem>
                                )) : []}
                            </Select>
                        </FormControl>
                        <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        fullWidth
                        >
                        پیوستن
                        </Button>
            </form>
        </>
    )
}

export default Join
