import React, { useState, useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'
import  Chatroom  from './components/Chatroom';

import { useUser, authUser } from './contexts/UserContext'


const AppRouter = () => {
    const [path, setPath] = useState('')
    const { user, userDispatcher } = useUser()

    let location = useLocation()
    
    useEffect(() => {
        setPath(location.pathname)
    },[location])
    
    useEffect(async() => {
        const auth = await authUser(user.data['token'])
        userDispatcher({ type: 'AUTH_USER', payload: auth})    
    },[location.pathname])

    return (
        <>
            <Route path='/' exact>
                { user.logged_in ?  <Redirect to='/dashboard' /> : <Redirect to='/sign-in' /> }
            </Route>
            <Route path='/sign-in'>
                {!user.logged_in ? <SignIn /> : <Redirect to='/dashboard' />} 
            </Route>
            <Route path='/sign-up'>
                <SignUp />
            </Route>
            <Route path='/dashboard'>
                { user.logged_in ? <Dashboard /> : <Redirect to='/sign-in' /> }
            </Route>
            <Route path='/chatroom/:id'>
                <Chatroom />
            </Route>
        </>
    )

}
export default AppRouter
