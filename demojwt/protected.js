require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) 
         res.status(401).json({message : 'not allowed'})
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err)
            res.sendStatus(401)
        req.user = user
        next()
    } )

})

app.get('/protected', (req, res) =>{
    res.json(req.user)
} )

app.listen(4002, () => {

})

