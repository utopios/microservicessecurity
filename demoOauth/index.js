const express = require("express")
const app = express()

const authCodes = new Set()
const accessTokens = new Set()
const identityTokens = new Set()
app.use(express.json())
//End point générer le code
app.post('/code', (req, res) => {
    //Identification implicite
    const data = req.body
    //Générer un code
    const authCode = new Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('')
    authCodes.add({ code: authCode, 'expires_in': 60 * 5, 'identity_information': {} })
    authCodes.add(authCode)
    res.json({ code: authCode })
})


app.get('/code', (req, res) => {
    res.redirect('http://localhost:4000/identification.html')
})

app.post('/authorize', (req, res) => {
    //Générer un code
    const authCode = new Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('')
    authCodes.add({ code: authCode, 'expires_in': 60 * 5, 'identity_information': {} })
    res.json({ code: authCode })
})
app.post('/token', (req, res) => {
    const code = req.body.code
    //Vérifier le code 'state'
    if (authCodes.has(code)) {
        //génération du token
        const access_token = new Array(60).fill(null).map(() => Math.floor(Math.random() * 10)).join('')
        const identity_token = new Array(60).fill(null).map(() => Math.floor(Math.random() * 10)).join('')
        accessTokens.add({ token: access_token, expires_in: 60 * 60 * 24, scope: '' })
        identityTokens.add({ token: identity_token, expires_in: 60 * 60 * 24, identity_information: {} })
        //Supprimer le code
        authCodes.delete(code)
        res.json({ access_token: { token: access_token, expires_in: 60 * 60 * 24 }, identity_token: { token: identity_token, expires_in: 60 * 60 * 24 } })
    }
    else {
        res.status(400).json({ message: 'code invalide' })
    }
})

app.post('/secure', (req, res) => {
    const token = req.body.token
    if (accessTokens.has(token)) {
        res.status(200).json({ message: 'authorized' })
    }
    else {
        res.status(401)
    }
})

app.post('/identity', (req,res) => {
    const token = req.body.token
    if(identityTokens.has(token)) {
        res.status(200).json({identity_information:{}})
    }
    else {
        res.status(401)
    }
})
app.listen(4000, () => {

})