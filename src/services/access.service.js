const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { pickFields } = require('../utils')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {
            // check exist email
            const existShop = await shopModel.findOne({ email }).lean()
            if (existShop) {
                return {
                    code: 'xxx',
                    message: 'Email already registered!',
                }
            }
            // hash password
            const hashPassword = await bcrypt.hash(password, 10)
            // register
            const newShop = await shopModel.create({
                name, email, password: hashPassword, roles: [RoleShop.SHOP]
            })
            // register token
            if (newShop) {
                // create privateKey, publicKey
                // simple key
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                // save collection KeyStore
                const keyStore = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'Error create key token!',
                    }
                }
                // create token
                const token = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
                return {
                    code: 201,
                    metadata: {
                        shop: pickFields({ fields: ['_id', 'name', 'email'], object: newShop }),
                        token
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService