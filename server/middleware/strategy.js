const User = require('../models/User')
const History = require('../models/History')
const crypto = require('crypto-js')
const moment = require('moment')
const _ = require('lodash')

const isAuthenticated = async(req, res, next) => {
    const token = req.headers.authorization
    if(_.isEmpty(token)){
        return res.status(401).json({
            msg: 'غیر مجاز'
        })
    }
    let d = crypto.AES.decrypt(token, require('../config/keys').aesKey)
    d = crypto.enc.Utf8.stringify(d)
    let data = JSON.parse(d)
    const { ip, agent, username } = data
    const user = await User.findOne({ where: { username }})
    if(!user){
        return res.status(401).json({
            msg: 'غیر مجاز'
        })
    }
    if(user.status !== 'logged_in'){
        return res.status(401).json({
            msg: 'غیر مجاز'
        })
    }
    const history = await History.findOne({ where: {
        ip: ip,
        agent: agent,
        token
    }})
    if(!history){
        return res.status(401).json({
            msg: 'غیر مجاز'
        })
    }
    const cip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const cagent = JSON.stringify({
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform
    })
    if(!_.isEqual(cip, history.ip) || !_.isEqual(cagent,history.agent)){
        return res.status(401).json({
            msg: 'غیر مجاز'
        })
    }
    const ttl = history.ttl
    const iat = + history.iat
    const nw = + moment().unix()
    if( ttl <= 0 ){
        return res.status(401).json({
            msg: 'غیر مجاز'
        })
    }else{
        history.ttl = 300 - (nw - iat)
        await history.save()
        req.user = user
        req.history = history
        next()
    }
}

module.exports = isAuthenticated