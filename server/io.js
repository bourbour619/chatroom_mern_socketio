const moment = require('moment')

const { Server } = require('socket.io')


module.exports = appServer => {

const io = new Server(appServer, {
    cors: {
        origin: '*'
    }
})

let chatrooms = [
    {
        name: 'برنامه‌نویس‌ها',
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
        typing: []
    }
]

io.on('connection', (socket) => {
    const { room } = socket.handshake.query
    if(room){
        socket.join(room)
        socket.on('user-joined', (who) => {
            const wasInRoom = chatrooms.find(ch => ch.room === room)
                                        .users.includes(who)
            if(!wasInRoom){
                chatrooms.find(ch => ch.room === room)
                         .users
                         .push(who)
                const roomNo = chatrooms.findIndex(ch => ch.room === room)
                chatrooms[roomNo].no += 1
                const welcomeMsg = {
                    welcome: true,
                    who,
                    time : moment().format('HH:mm').toString()
                }
                chatrooms[roomNo].messages.push(welcomeMsg)
                io.to(room).emit('receive-message', welcomeMsg)
            }
            socket.emit('get-chatrooms', chatrooms)
            const { users } = chatrooms.find(ch => ch.room === room)
            io.to(room).emit('get-users', users)
        })

        socket.on('send-message', (msg) => {
            const who = msg.who
            const roomNo = chatrooms.findIndex(ch => ch.room === room)
            chatrooms[roomNo].messages.push(msg)
            const lastTyping = chatrooms[roomNo].typing.filter(t => t !== who)
            chatrooms[roomNo].typing = lastTyping
            const { typing } = chatrooms.find(ch => ch.room === room)
            io.to(room).emit('get-other-typing', typing)
            io.to(room).emit('receive-message', msg)
        })

        socket.on('set-me-typing', (who) => {
             const wasInTyping = chatrooms.some(ch => 
                                                    ch.room === room
                                                            &&
                                                    ch.typing.includes(who))
             if(!wasInTyping){
                 chatrooms.find(ch => ch.room === room)
                          .typing
                          .push(who)
             }
             const { typing } = chatrooms.find(ch => ch.room === room)
             io.to(room).emit('get-other-typing', typing)
        })

        socket.on('clear-me-typing', (who) => {
            const wasInTyping = chatrooms.some(ch => 
                                            ch.room === room
                                                    &&
                                            ch.typing.includes(who)) 
            if(wasInTyping){
                const roomNo = chatrooms.findIndex(ch => ch.room === room)
                chatrooms[roomNo].typing = chatrooms[roomNo].typing.filter(t => t !== who)
                const { typing } = chatrooms.find(ch => ch.room === room)
                io.to(room).emit('get-other-typing', typing)
            }
        })

        socket.on('user-left', (who) => {
            const roomNo = chatrooms.findIndex(ch => ch.room === room)
            const lastUsers = chatrooms[roomNo].users.filter(u => u !== who)
            chatrooms[roomNo].users = lastUsers
            const lastTyping = chatrooms[roomNo].typing.filter(t => t !== who)
            chatrooms[roomNo].typing = lastTyping
            const lastMessages = chatrooms[roomNo].messages.filter(m => !(m.welcome && m.who))
            chatrooms[roomNo].messages = lastMessages
            const { users, typing } = chatrooms.find(ch => ch.room === room)
            chatrooms.find(ch => ch.room === room).no -= 1
            io.to(room).emit('get-other-typing', typing)
            io.to(room).emit('get-users', users)
        })
    }

    socket.on('user-left-all', async(who) => {
        chatrooms =  chatrooms.map(ch => {
            if(!ch.users.includes(who) && !ch.typing.includes(who)) return ch
            ch.users = ch.users.filter(u => u !== who)
            ch.typing = ch.typing.filter(t => t !== who)
            ch.messages = ch.messages.filter(m => !m.welcome)
            ch.no = 0
            return ch
        })
        await Promise.all(chatrooms)
        socket.emit('get-chatrooms', chatrooms)
    })
    socket.emit('get-chatrooms', chatrooms)
})

}