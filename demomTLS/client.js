const axios = require('axios')
const https = require('https')
const fs = require('fs')
const options = {
    httpsAgent : new https.Agent({
        cert: fs.readFileSync('api1_cert.pem'),
        key : fs.readFileSync('api1_key.pem')
    })
}
axios.get('https://localhost:443/', options).then(res => {
    console.log(res)
})