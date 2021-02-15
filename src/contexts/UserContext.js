import React, {  useReducer, useContext, useEffect, createContext } from 'react'
import axios from 'axios'
import { API_URL } from '../config/keys'


const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const ACTIONS = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER'
}

export const authUser = async(token) => {
    if(!token){
        token = localStorage.getItem('user_token')
        if(!token){
            return false
        }
        let options = {
            headers: {
                Authorization: token
            }
        }
        const res = await axios.get(`${API_URL}/auth/`, options)
        if(res.status === 401){
            return false
        }
        return true
    }
    return false
}

export const registerUser = async(data) => {
    let done = {}
    const res = await axios.post(`${API_URL}/auth/register`, data)
    done = res.data.user ? {
        registered: true,
        data: res.data
    } : {
        registered: false,
        data: res.data
    }

    return done
}

export const loginUser = async(data) => {
    let user = {}
    const res = await axios.post(`${API_URL}/auth/login`, data)
    if(res.data.token){
        localStorage.setItem('user_token', res.data.token)
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
             return action.payload

        case ACTIONS.LOGOUT_USER:
            return {
                    ...state,
                    logged_in: false,
            }
        default : 
            return state
    }
}

export const UserProvider = ({children}) => {
    const initialValue = {
        logged_in: false,
    }
    const [state, dispatch] = useReducer(userReducer, initialValue )


    return (
        <UserContext.Provider value={{ user: state, userDisptacher: dispatch }}>
            {children}
        </UserContext.Provider>
    )
}