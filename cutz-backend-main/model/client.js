const mongoose = require("mongoose");

// ID
// Fname
// Lname
// Email
// PhoneNumber
// Address
// FamilySize
// Password
// ActiveStatus
// DateCreated
// LastLogin
// ProfilePicture
// ClientStatus
// ClientAttandance
const Client = new mongoose.Schema({
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
  familySize: {
    type: Number,
    required: [true, "FamilySize is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  clientStatus: {
    type: Boolean,
    default: true,
  },
  clientAttandance: {
    type: String,
    required: [true, "ClientAttandance is required"],
  },
  clientExists: {
    type: Boolean,
    default: false,
  },
  notificationReadStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Client", Client);
