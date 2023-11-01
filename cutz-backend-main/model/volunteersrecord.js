const mongoose = require("mongoose");

const volunteersRecord = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "LastName is required"],
  },
  organizationName: {
    type: String,
    required: [true, "organizationName is required"],
  },
  eventType: {
    type: String,
    required: [true, "eventType is required"],
  },
  addresses: [
    {
      place: { type: String, required: [true, "place is required"] },
      house: { type: String, required: [true, "house is required"] },
      zip: { type: String, required: [true, "zip is required"] },
      location: {
        latitude: {
          type: Number,
          retuired: [true, "Latitude for location is required"],
        },
        longitude: {
          type: Number,
          retuired: [true, "Longitude for location is required"],
        },
        latitudeDelta: {
          type: Number,
          retuired: [true, "LatitudeDelta for location is required"],
        },
        longitudeDelta: {
          type: Number,
          retuired: [true, "LongitudeDelta for location is required"],
        },
      },
    },
  ],
  location: {
    latitude: {
      type: Number,
      retuired: [true, "Latitude for location is required"],
    },
    longitude: {
      type: Number,
      retuired: [true, "Longitude for location is required"],
    },
    latitudeDelta: {
      type: Number,
      retuired: [true, "LatitudeDelta for location is required"],
    },
    longitudeDelta: {
      type: Number,
      retuired: [true, "LongitudeDelta for location is required"],
    },
  },
  endTime: {
    type: String,
    required: [true, "endtime is required"],
  },
  checkIn: {
    type: Number,
    required: [true, "Check In is required"],
  },
  checkOut: {
    type: Number,
    required: [true, "Check Out is required"],
  },
  reservedTime: {
    type: String,
    required: [true, "Reserved time is required"],
  },
  attendance: {
    type: String,
    required: [true, "attendance is required"],
  },
});

module.exports = mongoose.model("volunteersrecord", volunteersRecord);
