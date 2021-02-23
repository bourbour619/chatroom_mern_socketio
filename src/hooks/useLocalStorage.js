import React, { useState, useEffect } from 'react'
// import { authRoute } from '../config/api'

export default function useLocalStorage (key,iv){
    const [value, setValue] = useState(() => {
        const auth_data = localStorage.getItem(key)
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
        if(value){
            localStorage.setItem(key, JSON.stringify(value))
        }
    },[value])

    return [value, setValue]
}