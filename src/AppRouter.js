import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { CircularProgress, makeStyles } from '@material-ui/core'

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import  Chatroom  from './components/Chatroom';

import { useUser } from './contexts/UserContext'



const useStyles = makeStyles((theme) => ({
    notFound: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))




const routes = [
    {
        path: '/register',
        component: <Register />
    },
    {
        path: '/dashboard',
        component: <Dashboard />
    },
    {
        path: '/chatroom/:room',
        component: <Chatroom />
    }
]

const AppRouter = () => {

    const [user, setUser] = useUser()
    const [loading, setLoading] = useState(true)
    

    const NoMatch = () => {

        let location = useLocation();
        const classes = useStyles()

        return (
            <div className={classes.notFound}>
                    <h1>خطای 404</h1>
                    <h3>
                        صفحه مورد نظر یافت نشد
                        <code dir='ltr'>{location.pathname}</code>
                    </h3>
            </div>
        )
    }

    const Loading = () => {
        const classes = useStyles()

        return (
            <div className={classes.loading}>
                    <CircularProgress className='m-auto' /> 
            </div>
        )
    }
    
    const PrivateRoute = ({children, ...rest}) => {
        return (
            <Route
              {...rest}
              render={({ location }) =>
                user.token ? (
                  children
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location }
                    }}
                  />
                )
              }
            />
          );
    
    }



    useEffect(() =>{
            setTimeout(() => {
                if(user.token !== ''){
                    setTimeout(() => setLoading(false), 1000)
                } else {
                    setLoading(!loading)
                }
            },1000)
    },[user])


    return (
        <>  
            <Switch>
                <Route exact path='/' render={() => <Redirect to='/login' />} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                { loading ? 
                        <Loading />
                        : 
                        routes.map((route,i) => (
                            <PrivateRoute key={i} path={route.path}>
                                {route.component}
                            </PrivateRoute>
                        )) 
                }
                <Route path='*' component={NoMatch} />
            </Switch>
        </>
    )

}

export default AppRouter
