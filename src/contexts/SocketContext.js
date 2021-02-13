import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState()
    const [id, setId] = useState('')
    useEffect(() => {
        const newSocket = io(
            'http://localhost:5003',
            { query: { id }}
        )
        setSocket(newSocket)
        return () => newSocket.close()
    },[id])

    return (
        <SocketContext.Provider value={[socket, setId]}>
            {children}
        </SocketContext.Provider>
    )
}

