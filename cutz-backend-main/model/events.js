const mongoose = require("mongoose");

// ID
// EventID
// Organization
// EventType
// Location
// PriorEventStartTime
// PriorEventEndTime
// EventStartTime
// EventEndTime
// AfterEventStartTime
// AfterEventEndTime
// EventCapacity
// GroupServicePeriod
// VolunteerCapacity
// Eventcode

const Event = new mongoose.Schema({
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "OrganizationID is required"],
  },
  event_id: {
    type: Number,
    required: [true, "Event ID is required"],
  },
  eventType: {
    type: String,
    required: [true, "EventType is required"],
  },
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
  // priorEventStartTime: {
  //   type: String,
  //   required: [true, "priorEventStartTime is required"],
  // },
  // priorEventEndTime: {
  //   type: String,
  //   required: [true, "priorEventEndTime is required"],
  // },
  // eventStartTime: {
  //   type: String,
  //   required: [true, "eventStartTime is required"],
  // },
  // eventEndTime: {
  //   type: String,
  //   required: [true, "eventEndTime is required"],
  // },
  // afterEventStartTime: {
  //   type: String,
  //   required: [true, "afterEventStartTime is required"],
  // },
  // afterEventEndTime: {
  //   type: String,
  //   required: [true, "afterEventEndTime is required"],
  // },
  eventCapacity: {
    type: Number,
    required: [true, "EventCapacity is required"],
  },
  groupServicePeriod: {
    type: String,
    required: [true, "GroupServicePeriod is required"],
  },
  volunteerCapacity: {
    type: Number,
    required: [true, "VolunteerCapacity is required"],
  },
  eventCode: {
    type: String,
    required: [true, "Eventcode is required"],
    minLength: 4,
    maxLength: 4,
  },
  eventPeriod: {
    type: String,
    required: [true, "eventPeriod is required"],
  },
  numberOfGroups: {
    type: Number,
    required: true,
  },
  checkInCode: {
    type: Number,
    required: [true, "checkInCode is required"],
  },
  checkOutCode: {
    type: Number,
    required: [true, "checkOutCode is required"],
  },
  unitsToDistribute: {
    type: Number,
    required: false,
  },
  unitPrice: {
    type: Number,
    required: false,
  },
  additionalDetails: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Event", Event);
