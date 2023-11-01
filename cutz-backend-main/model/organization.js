const mongoose = require('mongoose')



const Organization = new mongoose.Schema({
    organizationName: {
        type: String,
        required: [true, "Organization name is required"]
    }
})


module.exports = mongoose.model("Organization", Organization);