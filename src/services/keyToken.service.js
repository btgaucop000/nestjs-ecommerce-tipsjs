const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {

    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const token = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return token ? token : null
        } catch (error) {
            return error
        }
    }

}

module.exports = KeyTokenService