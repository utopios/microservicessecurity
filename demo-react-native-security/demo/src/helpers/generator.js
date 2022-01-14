import {randomBytes} from "crypto"

import * as CryptoJs from "crypto-js"
export const generateRandom = ()  => {
    const b = randomBytes(96)
    return b.toString('base64')
}

export const generateChallenge = (code) => {
    return CryptoJs.SHA256(code).toString(CryptoJs.enc.Base64)
}