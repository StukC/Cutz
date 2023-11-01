const EventRecord = require("../model/eventrecord");
const Event = require("../model/events");
const EventReservationVolunteer = require("../model/eventreservationvolunteer");
const EventReservationClient = require("../model/eventreservationclient");
const Timing = require("../model/timing");
const EventGroup = require("../model/eventgroup");
const ClientRecord = require("../model/clientsrecord");
const VolunteerRecord = require("../model/volunteersrecord");

const CreateEventRecord = async (req, res) => {
  const data = req.body;

  try {
    const clients = await EventReservationClient.find({
      eventID: data.eventId,
      checkIN: { $ne: null },
    }).populate({
      path: "clientID",
    });
    let numberOfClientsServed = 0;
    if (clients) {
      clients.forEach((oneClient) => {
        numberOfClientsServed =
          numberOfClientsServed + oneClient.clientID.familySize;
      });
    }
    const eventRecord = await EventRecord.create({
      eventId: data.eventId,
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
      checkInCode: data.checkInCode,
      checkOutCode: data.checkOutCode,
      numberOfGroups: data.numberOfGroups,
      groupSize: data.groupSize,
      organizationName: data.organizationName,
      priorEventStartTime: data.priorEventStartTime,
      priorEventEndTime: data.priorEventEndTime,
      eventStartTime: data.eventStartTime,
      eventEndTime: data.eventEndTime,
      afterEventStartTime: data.afterEventStartTime,
      afterEventEndTime: data.afterEventEndTime,
      numberOfClientsServed: numberOfClientsServed,
      totalNumberOfPeopleServed: clients.length || 0,
    });
    const eventReservationClient = await EventReservationClient.find({
      eventID: data.eventId,
    })
      .populate({
        path: "eventID",
        populate: {
          path: "orgId",
        },
      })
      .populate({ path: "clientID" })
      .populate({ path: "eventGroupID" });

    if (eventReservationClient) {
      eventReservationClient.forEach(async (eventClient) => {
        await ClientRecord.create({
          firstName: eventClient.clientID?.firstName,
          lastName: eventClient.clientID?.lastName,
          organizationName: eventClient.eventID?.orgId?.organizationName,
          eventType: eventClient.eventID?.eventType,
          location: eventClient.eventID?.location,
          addresses: eventClient.eventID?.addresses,
          familySize: eventClient.clientID?.familySize,
          checkIn: eventClient.checkIN || 0,
          checkOut: eventClient.checkOut || 0,
          reservedTime: "  ",
          attendance: "  ",
        });
      });
    }
    const eventReservationVolunteer = await EventReservationVolunteer.find({
      eventID: data.eventId,
    })
      .populate({
        path: "eventID",
        populate: {
          path: "orgId",
        },
      })
      .populate({ path: "volunteerID" })
      .populate({ path: "eventGroupID" });

    if (eventReservationVolunteer) {
      eventReservationVolunteer.forEach(async (eventVolunteer) => {
        await VolunteerRecord.create({
          firstName: eventVolunteer.volunteerID?.firstName,
          lastName: eventVolunteer.volunteerID?.lastName,
          organizationName: eventVolunteer.eventID?.orgId?.organizationName,
          eventType: eventVolunteer.eventID?.eventType,
          location: eventVolunteer.eventID?.location,
          addresses: eventVolunteer.eventID?.addresses,
          endTime: "  ",
          checkIn: eventVolunteer.checkIN || 0,
          checkOut: eventVolunteer.checkOut || 0,
          reservedTime: "  ",
          attendance: "  ",
        });
      });
    }
    await DeleteEventDetails(data.eventId);
    res.status(201).json({
      message: "Event record added successfully",
      id: eventRecord._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetEventRecords = async (req, res) => {
  try {
    const events = await EventRecord.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetSingleEvent = async (req, res) => {
  try {
    const event = await EventRecord.findOne({ _id: req.params.id });
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

const UpdateEvent = async (req, res) => {
  const newObj = {};
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i];
  }
  try {
    const event = await EventRecord.findOneAndUpdate(
      { _id: req.params.id },
      newObj
    );
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

const DeleteEventDetails = async (eventId) => {
  try {
    await Event.findOneAndDelete({ _id: eventId });
    await EventReservationClient.deleteMany({ eventID: eventId });
    await EventGroup.deleteMany({ eventID: eventId });
    await Timing.deleteMany({ eventId: eventId });
    return await EventReservationVolunteer.deleteMany({
      eventID: eventId,
    });
  } catch (err) {
    return false;
  }
};

module.exports = {
  CreateEventRecord,
  GetEventRecords,
  GetSingleEvent,
  UpdateEvent,
  DeleteEventDetails,
};
