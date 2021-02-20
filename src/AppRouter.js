import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

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
    }
}))




// const routes = [
//     {
//         path: '/register',
//         component: <Register />
//     },
//     {
//         path: '/dashboard',
//         component: <Dashboard />
//     },
//     {
//         path: '/chatroom/:id',
//         component: <Chatroom />
//     }
// ]

const AppRouter = () => {

    const [user, setUser] = useUser()

    const NoMatch = () => {
    
        const classes = useStyles()
        let location = useLocation();
      
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
    
    // const PrivateRoute = ({children, ...rest}) => {
    //     console.log(user)
    //     return (
    //         <Route
    //           {...rest}
    //           render={({ location }) =>
    //             user.token ? (
    //               children
    //             ) : (
    //               <Redirect
    //                 to={{
    //                   pathname: "/login",
    //                   state: { from: location }
    //                 }}
    //               />
    //             )
    //           }
    //         />
    //       );
    
    // }


    return (
        <>
            {/* {routes.map((route,i) => (
                    <PrivateRoute key={i} path={route.path}>
                        {route.component}
                    </PrivateRoute>
            ))} */}
        <Switch>
            <Route exact path='/' render={() => <Redirect to='/login' />} />
            <Route exact path='/login'>
                {!user.token ? <Login /> : <Redirect to='/dashboard' />}
            </Route>
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard'> 
                {user.token ? <Dashboard /> : <Redirect to='/login' />}
            </Route>
            <Route exact path='/chatroom/:id'> 
                {user.token ? <Chatroom /> : <Redirect to='/login' />}
            </Route>
            <Route path='*' component={NoMatch} />
        </Switch>
        </>
    )

}

export default AppRouter
