import React, {  useState, useEffect, useContext , createContext } from 'react'

import useAuthRoute from '../hooks/useAuthRoute'

import { AUTH_KEY } from '../config/keys'



const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => { 

    const iv = { 
        usrename: '',
        who: '',
        token: '',
        ttl: 0
    }
    const [user, setUser] = useAuthRoute(iv)
    
    useEffect(() => {
        const { token , ttl } = user
        if(token){
            setTimeout(() => {
                localStorage.removeItem(AUTH_KEY)

            },ttl * 1000)
        }
        console.log(user)
    },[user])


    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}