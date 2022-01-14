require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const axios = require('axios')
app.use(express.json())
app.use((req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) 
         res.status(401).json({message : 'not allowed'})
    // jwt.verify(token, process.env.SECRET, (err, user) => {
    //     if(err)
    //         res.sendStatus(401)
    //     req.user = user
    //     next()
    // } )

    //Appeler l'authorization server
    axios.post($`http://authorize_server:4001/authorize`, {token: token}).then(res => {
        req.user = res.data.user
        next()
    }).catch(err => {
        res.status(401).json({message : 'not allowed'})
    })
})

app.get('/protected', (req, res) =>{
    res.json(req.user)
} )

app.listen(4002, () => {

})

