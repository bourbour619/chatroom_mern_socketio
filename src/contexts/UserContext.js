import React, {  useState, useEffect, useContext , createContext } from 'react'

import { PREFIX } from '../config/keys'

import { useAuth } from './AuthContext'
import { authRoute } from '../config/api'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => { 
    const iv = { auth: false }
    const [user, setUser] = useState(iv)
    const  [auth, setAuth] = useAuth()

    useEffect(() => {
        const { token, ttl } = auth
        authRoute(token, (user, dt) => {
            if(!user) {
                setUser(iv)
            } else {
                const { username, who } = dt
                setUser({ username, who, auth: true })
            }
        })
        if(auth.ttl === 0) setUser(iv)
    },[auth])

    return (
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
}