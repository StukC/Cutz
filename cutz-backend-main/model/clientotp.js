const mongoose = require('mongoose')



const ClientOtp = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Organization name is required"]
    },
    otp: {
        type: String,
        required: [true, "OTP is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("ClientOtp", ClientOtp);