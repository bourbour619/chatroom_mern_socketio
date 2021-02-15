import React, {  useReducer, useContext, useEffect, createContext } from 'react'
import axios from 'axios'
import { API_URL } from '../config/keys'


const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const ACTIONS = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    AUTH_USER: 'AUTH_USER'
}

export const authUser = async(token) => {
    let auth = false
    if(!token){
        const saved = localStorage.getItem('user_data')
        token = JSON.parse(saved).data['token']
    }
    if(token){
        let options = {
            headers: {
                Authorization: token
            }
        }
        const res = await axios.get(`${API_URL}/auth/who`, options)

        if(res.status === 401){
            auth = false
        }
        auth =  true
    }
    return auth
}

export const registerUser = async(data) => {
    let done = {}
    const res = await axios.post(`${API_URL}/auth/register`, data)
    done = res.data.user ? { registered: false,
                            data: res.data } :             
                            { registered: true,
                            data: res.data }
    return done
}

export const loginUser = async(data) => {
    let user = {}
    const res = await axios.post(`${API_URL}/auth/login`, data)
    if(res.data.token){
         user = {
            logged_in: true,
            data : res.data
        }
    }else{
        user = {
            logged_in: false,
            data : res.data
        }
    }
    return user
  }


const userReducer = (state, action) => {
    switch(action.type){
        case ACTIONS.LOGIN_USER:
            const user = action.payload
            const saved = JSON.stringify(action.payload)
            localStorage.setItem('user_data', saved)
             return user

        case ACTIONS.LOGOUT_USER:
            localStorage.removeItem('user_data')
            return {
                    ...state,
                    logged_in: false,
            }
        case ACTIONS.AUTH_USER:
            const { logged_in } = state
            if(logged_in === action.payload){
                return state
            }
            return {
                ...state,
                logged_in: false
            }
        default : 
            return state
    }
}

export const UserProvider = ({children}) => {
    const initialValue = {
        logged_in: false,
        data: {
            token: ''
        }
    } 
    const [state, dispatch] = useReducer(userReducer, initialValue )




    return (
        <UserContext.Provider value={{ user: state, userDispatcher: dispatch }}>
            {children}
        </UserContext.Provider>
    )
}