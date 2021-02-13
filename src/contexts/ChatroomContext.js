import React, { createContext, useEffect, useState, useContext } from 'react'


const ChatroomContext = createContext()

export const useChatroom = () => {
    return useContext(ChatroomContext)
}

export const ChatroomProvider = ({children}) => {
    const [chatrooms, setChatrooms] = useState([
        {
            name: 'برنامه نویس‌‌ها',
            id: 'developers'
        },
        {
            name: 'مدیران',
            id: 'managers'
        },
        {
            name: 'عمومی',
            id: 'general'
        }
    ])

    return (
        <ChatroomContext.Provider value= {chatrooms}>
            {children}
        </ChatroomContext.Provider>
    )
}