import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'
import  Chatroom  from './components/Chatroom';

import { ChatroomProvider } from './contexts/ChatroomContext'
import { SocketProvider } from './contexts/SocketContext'

import myTheme from './config/MyTheme'
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'



const jss = create({ plugins: [...jssPreset().plugins, rtl()]})

function App() {
  return (
   <>
    <StylesProvider jss={jss}>
    <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <SocketProvider >
          <ChatroomProvider>
            <Router>
                <Switch>
                    <Route path='/sign-in'>
                        <SignIn />
                    </Route>
                    <Route path='/sign-up'>
                        <SignUp />
                    </Route>
                    <Route path='/dashboard'>
                        <Dashboard />
                    </Route>
                    <Route path='/chatroom/:id'>
                        <Chatroom />
                    </Route>
                </Switch>
            </Router>
          </ChatroomProvider>
          </SocketProvider>
      </ThemeProvider>
    </StylesProvider>
   </>
  )
}

export default App;
