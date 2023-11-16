const jwt = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // create token
        const accessToken = await jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = await jwt.sign(payload, privateKey, {
            expiresIn: '7 days'
        })
        jwt.verify( accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log(`Error verify::`, err);
            } else {
                console.log(`Success verify::`, decode);
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {

    }
}

module.exports = {
    createTokenPair
}