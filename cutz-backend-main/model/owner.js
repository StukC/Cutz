const mongoose = require('mongoose')

// ID
// Fname
// Lname
// Email
// PhoneNumber
// Address
// Password
// ActiveStatus
// DateCreated
// LastLogin
// ProfilePicture


const Owner = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is required"],
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phoneNumber: {
        type: String,
        required: [true, "PhoneNumber is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    activeStatus: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: String,
    }
})

module.exports = mongoose.model("Owner", Owner);