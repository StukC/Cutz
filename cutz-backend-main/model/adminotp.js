const mongoose = require("mongoose");

const AdminOtp = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("AdminOtp", AdminOtp);
