const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000

// count number of connections
const countConnect = () => {
    const numConnections = mongoose.connections.length
    console.log(`Number of connections::${numConnections}`);
}

// check overload connection
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUse = process.memoryUsage().rss
        // assume maximum number of connections based on number of cores
        const maxConnection = numCores * 6
        console.log(`Active connections::${numConnections}`);
        console.log(`Memory usage:: ${memoryUse / 1024 / 1024} MB`);
        if (numConnections > maxConnection) {
            console.log(`Connection overload detected`);
            // send notify
        }

    }, _SECOND); // monitor every 5s
}

module.exports = {
    countConnect,
    checkOverload
}