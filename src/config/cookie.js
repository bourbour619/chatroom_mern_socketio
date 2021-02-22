import moment from 'moment'

export const setCookie = (name, value, days, path) => {
        const expires = moment().add(days,'d').utc().format()
        const ck = btoa(`${name}=${value};expires=${expires};path=/${path}`)
        document.cookie = ck
        
}


export const getCookie = (name) => {
    const ck = atob(document.cookie)
    const inCookie = ck.split(';')
                    .find(ck => ck.startsWith(`${name}=`))
    if(!inCookie) return
    return inCookie.split('=')[1]
}