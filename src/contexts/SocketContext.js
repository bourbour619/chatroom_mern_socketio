import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
    const newSocket = io('http://localhost:5003')
    const [socket, setSocket] = useState(newSocket)
    const [room, setRoom] = useState('')
    useEffect(() => {
        if(room){
            const newSocket = io(
                    'http://localhost:5003',
                    { query: { room }})
            console.log(socket)
            setSocket(newSocket)
        }
        return () => newSocket.close()
    },[room])

    return (
        <SocketContext.Provider value={{socket, room, setRoom}}>
            {children}
        </SocketContext.Provider>
    )
}

