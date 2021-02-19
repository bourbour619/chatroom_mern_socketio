import React, { useState, useEffect } from 'react'

import { PREFIX } from '../config/keys'


export default function useLocalStorage (key, initialValue){
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(prefixedKey)
        if(item) return JSON.parse(item)
        if(typeof initialValue === 'function'){
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])

    return [value, setValue]
}