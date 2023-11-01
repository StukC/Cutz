const mongoose = require("mongoose");

const Client = new mongoose.Schema({
  organization: {
    type: String,
    required: [true, "organization is required"],
  },
  eventType: {
    type: String,
    required: [true, "eventType is required"],
  },
  eventLocation: {
    type: String,
  },
  notificationText: {
    type: String,
    required: [true, "notificationText is required"],
  },
});

module.exports = mongoose.model("Notifications", Client);
