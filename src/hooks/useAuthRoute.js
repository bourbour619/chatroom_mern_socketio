import React, { useState, useEffect } from 'react'

import { AUTH_KEY } from '../config/keys'
import { authRoute } from '../config/api'

export default function useAuthRoute (iv){
    const [value, setValue] = useState(() => {
        const auth_data = localStorage.getItem(AUTH_KEY)
        if(auth_data){
            const { token, ttl } = JSON.parse(auth_data)
            authRoute(token, (auth, data) => {
                if(!auth) setValue(iv)
                setValue(data)
            })
        }

        return iv
    })

    useEffect(() => {
        const { token, ttl } = value 
        const auth_data = { token, ttl }
        localStorage.setItem(AUTH_KEY, JSON.stringify(auth_data))
    },[AUTH_KEY, value])

    return [value, setValue]
}