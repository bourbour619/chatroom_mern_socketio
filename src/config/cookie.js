import moment from 'moment'

export const setCookie = (name, value, days, path) => {
        const expires = moment().add(days,'d').utc().format()
        document.cookie = `${name}=${value};expires=${expires};path=/${path}`
}


export const getCookie = (name) => {
    const inCookie = document.cookie
                             .split(';')
                             .find(ck => ck.startsWith(`${name}=`))
    if(!inCookie) return
    return inCookie.split('=')[1]
}