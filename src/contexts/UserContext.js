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