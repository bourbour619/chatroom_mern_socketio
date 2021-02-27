import React, { createContext, useEffect, useState, useContext } from 'react'

import { useSocket } from '../contexts/SocketContext'

const ChatroomContext = createContext()

export const useChatroom = () => {
    return useContext(ChatroomContext)
}

export const ChatroomProvider = ({children}) => {
    const iv = [
        {
            name: 'برنامه نویس‌‌ها',
            room: 'developers',
            no: 0,
            users: [],
            messages: [],
            typing: []
        },
        {
            name: 'مدیران',
            room: 'managers',
            no: 0,
            users: [],
            messages: [],
            typing: []
        },
        {
            name: 'عمومی',
            room: 'general',
            no: 0,
            users: [],
            messages: [],
            typgin :[]
        }
    ]

    const [chatrooms, setChatrooms] = useState([])
    const { socket } = useSocket()

    useEffect(() => {
        socket.on('get-chatrooms', (chatrooms) => {
            setChatrooms(chatrooms)
        })
    },[socket])

    return (
        <ChatroomContext.Provider value= {[chatrooms, setChatrooms]}>
            {children}
        </ChatroomContext.Provider>
    )
}