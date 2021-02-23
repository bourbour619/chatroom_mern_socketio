import moment from 'moment'

export const setCookie = (name, value, hours, path) => {
        const expires = moment().add(hours,'h').utc().format()
        document.cookie = `${name}=${btoa(value)};expires=${expires};path=/${path}`
        
}


export const getCookie = (name) => {
    const inCookie = document.cookie
                             .split(';')
                             .find(ck => ck.startsWith(`${name}=`))
    if(!inCookie) return
    return atob(inCookie.split('=')[1])
}