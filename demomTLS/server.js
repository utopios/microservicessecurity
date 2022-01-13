const express = require('express')
const https = require('https')
const fs = require('fs')
const options = {
    key : fs.readFileSync('api1_key.pem'),
    cert : fs.readFileSync('api1_cert.pem'),
    rejectUnauthorized: false,
    requestCert:true,
    ca : [
        fs.readFileSync("server_cert.pem")
    ]
}
const app = express()

app.use(express.json())
app.get('/', (req, res) =>{
    const cert = req.socket.getPeerCertificate()
    if(cert.subject == undefined) {
        res.status(401).json({message : 'no certificate'})
    }
    if(cert.subject.CN == 'localhost') {
        console.log('test')
        res.json({
            message :'ok'
        })
    }
    else {
        res.status(401).json({message : 'error'})
    }
} )
app.get('/authenticated', (req, res)=> {

})

https.createServer(options, app).listen(443, () => {

})

