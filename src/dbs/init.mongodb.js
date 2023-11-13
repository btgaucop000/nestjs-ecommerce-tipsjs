const mongoose = require('mongoose')
const connectStr = `mongodb://localhost:27017/shopDEV`
const { countConnect } = require('../helpers/check.connect')

class Database {
    constructor() {
        this.connect()
    }

    // connect 
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectStr).then(() => {
            console.log('Connected Mongodb success');
            countConnect()
        })
            .catch(err => console.log(`Connect error`))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb