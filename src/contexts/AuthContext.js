import React , { useEffect, useContext, createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

import { PREFIX } from '../config/keys'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}



export const AuthProvider = ({children}) => {
    const iv = { token: '', ttl: 0 }
    const [auth, setAuth] = useLocalStorage('auth_data', iv)
    

    useEffect(() => {
        const ttl = auth.ttl
        setTimeout(() => {
            localStorage.removeItem(PREFIX + 'auth_data')
            setAuth(iv)
        },ttl * 1000)
    },[auth])


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}