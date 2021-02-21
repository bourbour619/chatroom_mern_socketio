import React, { useState, useEffect } from 'react'

import { AUTH_KEY } from '../config/keys'
import { authRoute, sleep } from '../config/api'

export default function useAuthRoute (iv){
    const [value, setValue] = useState(() => {
        const auth_data = localStorage.getItem(AUTH_KEY)
        // if(auth_data){
        //     const { token, ttl } = JSON.parse(auth_data)
        //     authRoute(token, (done, data) => {
        //         if(!done) user = iv
        //         user = data
        //     })
        // }
        if(auth_data) return JSON.parse(auth_data)
        return iv
    })

    useEffect(() => {
        const { token, ttl } = value 
        // const auth_data = { token, ttl }
        localStorage.setItem(AUTH_KEY, JSON.stringify(value))
    },[value])

    return [value, setValue]
}