const mongoose = require("mongoose");

// ID
// ClientID
// EventGroupsID
// EventID
// CheckIN
// CheckOut

const EventReservationVolunteer = new mongoose.Schema({
  volunteerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
  },
  eventGroupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventGroup",
    required: [true, "EventGroupID is required"],
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "EventID is required"],
  },
  checkIN: {
    type: String,
    default: null,
  },
  checkOut: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model(
  "EventReservationVolunteer",
  EventReservationVolunteer
);
