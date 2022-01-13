require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')

app.use(cors({
    origin : '*'
}))
app.use(express.json())
app.post('/login', (req, res) => {
    const user = req.body
    
    if(user.login == "user" && user.password == "password") {
        const token = jwt.sign({username : 'name', role: 'admin'},process.env.SECRET,{expiresIn : '1d'})
        res.status(200).json({token : token})
    }
})

app.post('/authorize', (req, res) => {
    const token = req.body.token
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err)
            res.sendStatus(401)
        res.status(200).json({user: user})
    } )
})
app.listen(4001, () => {

})

