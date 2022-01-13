require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())
app.post('/login', (req, res) => {
    const user = req.body
    
    if(user.login == "user" && user.password == "password") {
        const token = jwt.sign({username : 'name', role: 'admin'},process.env.SECRET,{expiresIn : '1d'})
        res.status(200).json({token : token})
    }
})


app.listen(4001, () => {

})

