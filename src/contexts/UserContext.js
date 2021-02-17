import React, {  useState, useContext , createContext } from 'react'



const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    
    const [user, setUser] = useState({
        auth: false
    })

    return (
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
}