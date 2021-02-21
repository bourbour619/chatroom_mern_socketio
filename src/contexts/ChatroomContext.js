import React, { createContext, useEffect, useState, useContext } from 'react'


const ChatroomContext = createContext()

export const useChatroom = () => {
    return useContext(ChatroomContext)
}

export const ChatroomProvider = ({children}) => {
    const [chatrooms, setChatrooms] = useState([
        {
            name: 'برنامه نویس‌‌ها',
            room: 'developers',
            users: []
        },
        {
            name: 'مدیران',
            room: 'managers',
            users: []
        },
        {
            name: 'عمومی',
            room: 'general',
            users: []
        }
    ])

    return (
        <ChatroomContext.Provider value= {[chatrooms, setChatrooms]}>
            {children}
        </ChatroomContext.Provider>
    )
}