const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const crypto = require('crypto-js')
const _ = require('lodash')
const moment = require('moment')

const User = require('../models/User')
const History = require('../models/History')

const isAuthenticated = require('../middleware/strategy')

router.get('/who', isAuthenticated, (req, res) => {
    const { token, ttl } = req.history
    const { username, who } = req.user
    res.status(200).json({
        token,
        ttl,
        username,
        who
    })
}) 

router.post('/login', (req, res) => {
    const data = req.body
    let errors = {}
    if(_.isEmpty(data)){
        errors.input = 'ورودی نامعتبر است'
    }else{
        Object.keys(data).forEach(k => {
            if(_.isEmpty(data[k])){
                errors[k] = 'ورودی نامعتبر است'
            }
        })
    }
    if(!_.isEmpty(errors)){
        res.status(400).json(errors)
    }else{
        const { username, password } = data
        User.findOne({
            where: {
                username
            }
        })
        .then(async(user) => {
            if(!user){
                res.status(404).json({
                    msg: 'کاربر یافت نشد'
                })
            }else{
                const isMatch = await bcrypt.compareSync(password, user.password)
                if(!isMatch){
                    res.status(409).json({
                        msg: 'رمز عبور اشتباه است'
                    })
                }else{
                    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    const agent = {
                        browser: req.useragent.browser,
                        version: req.useragent.version,
                        os: req.useragent.os,
                        platform: req.useragent.platform
                    }
                    const payload = JSON.stringify({
                            ip,  
                            agent: JSON.stringify(agent),
                            username: user.username 
                    })
                    const token = crypto.AES.encrypt(payload, require('../config/keys').aesKey).toString()
                    const iat = moment().unix()
                    const ttl = 300
                    const { username }  = user
                    const history = await History.findOne({ where: { username } })
                    try {
                        if(history){
                            history['ip'] = ip
                            history['agent'] = JSON.stringify(agent)
                            history['token']= token
                            history['iat']= iat
                            history['ttl'] = ttl
                            await history.save()
                        } else {
                            const newHistory = await History.create({
                                username: user.username,
                                ip,
                                agent: JSON.stringify(agent),
                                token,
                                iat,
                                ttl
                            })
                        }
                        user.status = 'logged_in'
                        const { username, who } = user
                        await user.save()
                        res.status(200).json({
                            msg: 'کاربر وارد شد',
                            token,
                            ttl,
                            username,
                            who
                        })
                    }
                    catch(err){
                        console.log(err)
                            res.status(500).json({
                                msg: 'ورود کاربر با خطای زیر مواجه شد',
                                error: err
                            })
                    }
                    
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'ورود کاربر با خطای زیر مواجه شد',
                error: err
            })
        })
    }
})

router.post('/register', async(req, res) => {
    const data = req.body
    let errors = {}
    if(_.isEmpty(data)){
        errors.input = 'ورودی نامعتبر است'
    }else{
        Object.keys(data).forEach(k => {
            if(_.isEmpty(data[k])){
                errors[k] = 'ورودی نامعتبر است'
            }
        })
    }
    if(!_.isEmpty(errors)){
        res.status(400).json(errors)
    }else{
        const { username, email, who, password } = data
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        User.create({
            username,
            password: hash,
            email,
            who
        })
        .then(user => res.status(200).json({
            msg: 'کاربر ثبت نام شد',
            user: {
                username: user.username,
                email: user.email,
                who: user.who
            }
        }))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'ثبت نام کاربر با خطای زیر مواجه شد',
                error: err
            })
        })
    }
    


})

module.exports = router