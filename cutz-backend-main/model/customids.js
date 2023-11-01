const mongoose = require('mongoose')



const CustomId = new mongoose.Schema({
    eventId: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model("CustomId", CustomId);