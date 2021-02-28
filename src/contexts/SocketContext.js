import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'

import { SOCKET_URL } from '../config/keys'

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
    const newSocket = io(SOCKET_URL)
    const [socket, setSocket] = useState(newSocket)
    const [room, setRoom] = useState('')
    useEffect(() => {
        let newSocket = {}
        if(room){
             newSocket = io(
                    SOCKET_URL,
                    { query: { room }})
        }else{
             newSocket = io(SOCKET_URL)
        }
        setSocket(newSocket)
        return () => newSocket.close()
    },[room])

    return (
        <SocketContext.Provider value={{socket, room, setRoom}}>
            {children}
        </SocketContext.Provider>
    )
}

