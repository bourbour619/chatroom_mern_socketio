import './App.css';


import { ChatroomProvider } from './contexts/ChatroomContext'
import { SocketProvider } from './contexts/SocketContext'
import { UserProvider, useUser } from './contexts/UserContext'

import myTheme from './config/MyTheme'
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'

import AppRouter from './AppRouter'

const jss = create({ plugins: [...jssPreset().plugins, rtl()]})

function App() {

  return (
   <>
   <UserProvider>
       <div className='App'>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={myTheme}>
                    <CssBaseline />
                    <SocketProvider >
                            <ChatroomProvider>
                                <AppRouter />
                            </ChatroomProvider>
                    </SocketProvider>
                </ThemeProvider>
            </StylesProvider>
        </div>
    </UserProvider>
   </>
  )
}

export default App;
