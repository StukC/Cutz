const mongoose = require('mongoose');


const ConnectMongoDB = (url) => {
    return mongoose.connect(url)
}

module.exports = ConnectMongoDB
