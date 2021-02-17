import React , { useEffect, useContext, createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

import axios from 'axios'
import { API_URL, PREFIX } from '../config/keys'

import { useUser } from './UserContext'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}



export const AuthProvider = ({children}) => {
    const [user, setUser] = useUser()

    const [auth, setAuth] = useLocalStorage('auth_data', { token: '', ttl: 0})

    const loginUser = (data) => {
        if(!data) return 
        axios.post(`${API_URL}/auth/login`, data)
                .then(res => {
                    const { token, ttl, username, who } = res.data
                    if(token){
                        setAuth({ token, ttl })
                        setUser({ username, who, auth: true })
                    }
                })
                .catch(err => console.log(err))
    }
    
    const authUser = () => {
        const { token } = auth
        if(!token) return
        axios.get(`${API_URL}/auth/who`)
                .then(res => {
                    const {token, ttl, username} = res.data
                    if(username === user.username){
                        setAuth({ token, ttl})
                    }
                })
                .catch(err => {
                    console.log(err)
                    setAuth()   
                    setUser()
                })
    }

    useEffect(() => {
        const { ttl } = auth
        setTimeout(() => {
            localStorage.removeItem(PREFIX + 'auth_data')
            setUser({auth: false})
        },ttl * 1000)
    },[auth.ttl])


    return (
        <AuthContext.Provider value={{ loginUser, authUser }}>
            {children}
        </AuthContext.Provider>
    )
}