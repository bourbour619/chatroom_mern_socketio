import './App.css';

import { BrowserRouter as Router } from 'react-router-dom'

import { ChatroomProvider } from './contexts/ChatroomContext'
import { SocketProvider } from './contexts/SocketContext'
import { UserProvider } from './contexts/UserContext'


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
    <SocketProvider>
        <UserProvider>    
                <div className='App'>
                        <StylesProvider jss={jss}>
                            <ThemeProvider theme={myTheme}>
                                <CssBaseline />
                                        <ChatroomProvider>
                                            <Router>
                                                <AppRouter />
                                            </Router>
                                        </ChatroomProvider>
                            </ThemeProvider>
                        </StylesProvider>
                    </div>
        </UserProvider>
    </SocketProvider>
   </>
  )
}

export default App;
