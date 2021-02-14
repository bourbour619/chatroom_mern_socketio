import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'
import  Chatroom  from './components/Chatroom';

import { useUser } from './contexts/UserContext'


const AppRouter = () => {
    const { user } = useUser()
    console.log(user)
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        {user.logged_in ?  <Redirect to='/dashboard' /> : <Redirect to='/sign-in' />}
                    </Route>
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
        </>
    )

}
export default AppRouter
