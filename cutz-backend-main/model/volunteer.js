const mongoose = require("mongoose");

// ID
// Fname
// Lname
// Email
// PhoneNumber
// Address
// Employer
// Organization
// Password
// ActiveStatus
// DateCreated
// LastLogin
// ProfilePicture
// VolunteerStatus
// VolunteerAttandance

const Volunteer = new mongoose.Schema({
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
  employer: {
    type: String,
    // required: [true, "Employer is required"],
    default: "",
  },
  organization: {
    type: String,
    // required: [true, "Organization is required"],
    default: "",
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
  volunteerStatus: {
    type: Boolean,
    default: true,
  },
  volunteerAttandance: {
    type: String,
    required: [true, "VolunteerAttandance is required"],
  },
  volunteerExists: {
    type: Boolean,
    default: false,
  },
  notificationReadStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Volunteer", Volunteer);
