import React, { useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import  Chatroom  from './components/Chatroom';

import { useUser } from './contexts/UserContext'


const AppRouter = () => {
    const [user, setUser] = useUser()
    
    // let location = useLocation()
    
    // // useEffect(async() => {
    // //     const auth = await authUser()
    // //     userDispatcher({ type: 'AUTH_USER', payload: auth})   
    // // },[location.pathname])

    return (
        <>
            <Route path='/' exact>
                { user.auth ?  <Redirect to='/dashboard' /> : <Redirect to='/login' /> }
            </Route>
            <Route path='/login'>
                {!user.auth ? <Login /> : <Redirect to='/dashboard' />} 
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/dashboard'>
                { user.auth ? <Dashboard /> : <Redirect to='/login' /> }
            </Route>
            <Route path='/chatroom/:id'>
                {console.log(user.auth)}
                { user.auth ? <Chatroom /> : <Redirect to='/login' /> }
            </Route>
        </>
    )

}
export default AppRouter
