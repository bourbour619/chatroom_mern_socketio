import React, {  useReducer, useContext, useEffect, createContext } from 'react'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, )

    return (
        <UserContext.Provider value={}>
            {children}
        </UserContext.Provider>
    )
}