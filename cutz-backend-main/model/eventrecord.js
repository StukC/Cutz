const mongoose = require("mongoose");

const EventRecord = new mongoose.Schema({
  eventRecordID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  orgId: {
    type: String,
    required: [true, "orgld is required"],
  },
  eventId: {
    type: String,
    required: [true, "event_id is required"],
  },
  eventType: {
    type: String,
    required: [true, "eventType is required"],
  },
  location: {
    latitude: {
      type: Number,
      required: [true, "Latitude for location is required"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude for location is required"],
    },
    latitudeDelta: {
      type: Number,
      required: [true, "LatitudeDelta for location is required"],
    },
    longitudeDelta: {
      type: Number,
      required: [true, "LongitudeDelta for location is required"],
    },
  },
  addresses: [
    {
      place: { type: String, required: [true, "place is required"] },
      house: { type: String, required: [true, "house is required"] },
      zip: { type: String, required: [true, "zip is required"] },
      location: {
        latitude: {
          type: Number,
          required: [true, "Latitude for location is required"],
        },
        longitude: {
          type: Number,
          required: [true, "Longitude for location is required"],
        },
        latitudeDelta: {
          type: Number,
          required: [true, "LatitudeDelta for location is required"],
        },
        longitudeDelta: {
          type: Number,
          required: [true, "LongitudeDelta for location is required"],
        },
      },
    },
  ],
  eventCapacity: {
    type: String,
    required: [true, "eventCapacity is required"],
  },
  groupServicePeriod: {
    type: String,
    required: [true, "groupServicePeriod is required"],
  },
  volunteerCapacity: {
    type: String,
    required: [true, "volunteerCapacity is required"],
  },
  checkInCode: {
    type: String,
    required: [true, "checkInCode is required"],
  },
  checkOutCode: {
    type: String,
    required: [true, "checkOutCode is required"],
  },
  numberOfGroups: {
    type: String,
    required: [true, "numberOfGroups is required"],
  },
  groupSize: {
    type: String,
    required: [true, "groupSize is required"],
  },
  organizationName: {
    type: String,
    required: [true, "organizationName is required"],
  },
  priorEventStartTime: {
    type: String,
    required: [true, "priorEventStartTime is required"],
  },
  priorEventEndTime: {
    type: String,
    required: [true, "priorEventEndTime is required"],
  },
  eventStartTime: {
    type: String,
    required: [true, "eventStartTime is required"],
  },
  eventEndTime: {
    type: String,
    required: [true, "eventEndTime is required"],
  },
  afterEventStartTime: {
    type: String,
    required: [true, "afterEventStartTime is required"],
  },
  afterEventEndTime: {
    type: String,
    required: [true, "afterEventEndTime is required"],
  },
  numberOfClientsServed: {
    type: String,
    required: [true, "numberOfClientsServed is required"],
  },
  totalNumberOfPeopleServed: {
    type: String,
    required: [true, "totalNumberOfPeopleServed is required"],
  },
});

module.exports = mongoose.model("EventRecord", EventRecord);
