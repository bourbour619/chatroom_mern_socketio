import React, {  useState, useEffect, useContext , createContext } from 'react'


import { AUTH_KEY } from '../config/keys'
import { authRoute } from '../config/api'
import useLocalStorage from '../hooks/useLocalStorage'

import { useSocket } from '../contexts/SocketContext'


const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => { 

    const iv = { 
        usrename: '',
        who: '',
        token: '',
        ttl: 0,
    }
    const [user, setUser] = useLocalStorage(AUTH_KEY,iv)
    const { socket } = useSocket()
    
    useEffect(() => {
            const { token , ttl } = user
            if(token){
                setTimeout(() => {
                    localStorage.removeItem(AUTH_KEY)
                    return setUser(iv)
                },ttl * 1000)
            }
    })

    useEffect(() => {
        const auth_data = localStorage.getItem(AUTH_KEY)
        if(!user.token && !auth_data){
            socket.emit('user-left-all', user.who)
        }
    },[user])

    useEffect(() => {
        const { token , ttl } = user
        authRoute(token, (done, data) => {
            if(!done) return setUser(iv)
            return setUser(data)
        })
    },[])


    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}