const mongoose = require("mongoose");

// Prioreventstarttime
// Prioreventendtime
// EventstartTime
// EventEndTime
// AfterEventStartTime
// AfterEventEndTime

const Timing = new mongoose.Schema({
  //     Timings
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event ID is required"],
  },
  priorEventStartTime: {
    type: String,
    required: [true, "PriorEventStartTime is required"],
  },
  priorEventEndTime: {
    type: String,
    required: [true, "PriorEventEndTime is required"],
  },
  eventStartTime: {
    type: String,
    required: [true, "EventStartTime is required"],
  },
  eventEndTime: {
    type: String,
    required: [true, "EventEndTime is required"],
  },
  afterEventStartTime: {
    type: String,
    required: [true, "AfterEventStartTime is required"],
  },
  afterEventEndTime: {
    type: String,
    required: [true, "AfterEventEndTime is required"],
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
  },
});

module.exports = mongoose.model("Timing", Timing);
