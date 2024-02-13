const CustomId = require("../model/customids");
const Event = require("../model/events");
const EventGroup = require("../model/eventgroup");
const moment = require("moment");
const {
  getDistinctObjectsByKey,
  getDistinctObjectsByKeyForDates,
} = require("./Common");
const Timing = require("../model/timing");
const EventReservationClient = require("../model/eventreservationclient");

// Controller function to create an event
const CreateEvent = async (req, res) => {
  const data = req.body;
  const customIds = await CustomId.find();
  // res.json(customIds)

  try {
    // Generate array of alphabets for groups
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    // Calculate number of groups based on event time and service period
    let eventPeriod = Math.floor(
      (data.eventEndTime - data.eventStartTime) / 3600
    );
    let eventPeriodRemaining = (data.eventEndTime - data.eventStartTime) % 3600;
    let numberOfGroups;

    if (data.groupServicePeriod === "30 min") {
      numberOfGroups = eventPeriod / 0.5;
    } else {
      numberOfGroups = eventPeriod;
    }

    //Uncomment this logic if you need to consider remaining time after one hour of time
    // if (eventPeriodRemaining !== 0 && eventPeriodRemaining <= 1800) {
    //   numberOfGroups = numberOfGroups + 1;
    // } else if (eventPeriod > 1800 && eventPeriod <= 3600) {
    //   if (data.groupServicePeriod === "30 min") {
    //     numberOfGroups = numberOfGroups + 2;
    //   } else {
    //     numberOfGroups = numberOfGroups + 1;
    //   }
    // }

    // Create new event
    const event = await Event.create({
      event_id: customIds[0].eventId + 1,
      orgId: data.orgId,
      eventType: data.eventType,
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        latitudeDelta: data.location.latitudeDelta,
        longitudeDelta: data.location.longitudeDelta,
      },
      addresses: data.addresses,
      eventCapacity: data.eventCapacity,
      groupServicePeriod: data.groupServicePeriod,
      volunteerCapacity: data.volunteerCapacity,
      eventCode: data.eventCode,
      checkInCode: data.checkInCode,
      checkOutCode: data.checkOutCode,
      numberOfGroups: numberOfGroups,
      eventPeriod: eventPeriod,

      // Timing
      // priorEventStartTime: data.priorEventStartTime,
      // priorEventEndTime: data.priorEventEndTime,
      // eventStartTime: data.eventStartTime,
      // eventEndTime: data.eventEndTime,
      // afterEventStartTime: data.afterEventStartTime,
      // afterEventEndTime: data.afterEventEndTime,

      // place: data.place,
      // house: data.house,
      // zip: data.zip,
      // day: data.day ? data.day : null,
      // date: data.date ? data.date : null,
      // monthYear: data.monthYear ? data.monthYear : null,
    });

    // Calculate group capacities and create event groups
    let firstGroupCapacity = 0;
    const remainder = data.eventCapacity % numberOfGroups;
    if (remainder !== 0) {
      firstGroupCapacity =
        remainder + (data.eventCapacity - remainder) / numberOfGroups;
    } else {
      firstGroupCapacity = data.eventCapacity / numberOfGroups;
    }

    const groupSizeInSeconds =
      data.groupServicePeriod === "30 min" ? 1800 : 3600;
    for (let i = 0; i < numberOfGroups; i++) {
      await EventGroup.create({
        groupLetter: alphabet[i],
        eventID: event._id,
        groupCapacity:
          i === 0
            ? firstGroupCapacity
            : (data.eventCapacity - remainder) / numberOfGroups,
        groupHour: moment(
          Number(data.eventStartTime) + groupSizeInSeconds * i,
          "X"
        ).format("h:mm A"),
      });
    }

    // Update custom ID for the next event
    await CustomId.updateOne({}, { eventId: customIds[0].eventId + 1 });

    // Send success response
    res.status(201).json({
      message: "Event added successfully",
      id: event._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Controller function to retrieve all events
const GetEvents = async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: "orgId",
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Controller function to retrieve a single event
const GetSingleEvent = async (req, res) => {
  try {
    // Retrieve event based on event ID
    const event = await Event.findOne({ _id: req.params.id });
    if (!event) {
      return res.status(404).json({ msg: `No event with id ${req.params.id}` });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Controller function to update an event
const UpdateEvent = async (req, res) => {
  // Construct new object with updated data
  const newObj = {};
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i];
  }
  try {
    // Update event based on event ID
    const event = await Event.findOneAndUpdate({ _id: req.params.id }, newObj);
    if (!event) {
      return res.status(404).json({ msg: `No event with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Controller function to delete an event
const DeleteEvent = async (req, res) => {
  try {
    // Delete event based on event ID
    const event = await Event.findOneAndDelete({ _id: req.params.id });
    if (!event) {
      return res.status(404).json({ msg: `No event with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Controller function to retrieve data for the home screen
const getHomeScreenData = async (req, res) => {
  try {
    // Retrieve events based on the organization ID
    let events = await Event.find({ orgId: req.params.id });

    // Extract distinct event types from the retrieved events
    events = getDistinctObjectsByKey(
      events.map((o, index) => ({
        index: index,
        id: o._id,
        title: o.eventType,
      })),
      "title"
    );

    // Retrieve timing data for events and populate with event details
    let timing = await Timing.find().populate({
      path: "eventId",
    });

    // Iterate over each event to gather timing information
    for (let i = 0; i < events.length; i++) {
      let times = await timing.filter((time) => {
        return time.eventId?.eventType === events[i].title;
      });

      // Iterate over each timing entry to fetch event group details
      for (let i = 0; i < times.length; i++) {
        const eventGroup = await EventGroup.find({
          eventID: times[i].eventId?._id,
        });

        // Iterate over each event group to gather reservation counts
        let groups = [];
        for (const key of eventGroup) {
          const count = await EventReservationClient.countDocuments({
            eventID: key.eventID,
            eventGroupID: key._id,
          }) || 0;
          groups.push({ ...key._doc, count: count });
        }    
        
        // Update timing entry with event group details
        times[i] = {
          ...times[i]._doc,
          timeGroup: groups,
        };
      }

      // Update event entry with timing information
      events[i] = {
        ...events[i],
        times: times,
      };
    }

    // Check if events were successfully retrieved
    if (!events) {
      return res.status(404).json({ msg: `No event with id ${req.params.id}` });
    }
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  CreateEvent,
  GetEvents,
  GetSingleEvent,
  UpdateEvent,
  DeleteEvent,
  getHomeScreenData,
};
