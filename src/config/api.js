import axios from 'axios'
import { API_URL, PREFIX } from '../config/keys'

export const loginRoute = (data, done) => {
    if(!data) return 
    axios.post(`${API_URL}/auth/login`, data)
            .then(res => {
                const { token } = res.data
                if(token) done(true, res.data)
            })
            .catch(err => {
                console.log(err)
                done(false)
            })
}

export const authRoute = (token, done) => {
    if(!token) return
    const options = {
        headers: {
            Authorization: token
        }
    }
    axios.get(`${API_URL}/auth/who`, options)
            .then(res => {
                const { token } = res.data
                if(token) done(true, res.data)
            })
            .catch(err => {
                console.log(err)
                done(false)
            })
}

export const registerRoute = (data, done) => {
    if(!data) return 
    axios.post(`${API_URL}/auth/register`, data)
            .then(res => {
                const { user } = res.data
                if(user) done(true, res.data)
            })
            .catch(err => {
                console.log(err)
                done(false)
            })
}
