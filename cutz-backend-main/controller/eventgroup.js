const EventGroup = require("../model/eventgroup");
const EventReservationClient = require("../model/eventreservationclient");

const CreateEventGroup = async (req, res) => {
  const data = req.body;
  try {
    const eventGroup = await EventGroup.create({
      eventID: data.eventID,
      groupLetter: data.groupLetter,
      groupCapacity: data.groupCapacity,
      groupHour: data.groupHour,
    });
    res.status(201).json({
      message: "EventGroup added successfully",
      id: eventGroup._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetEventGroups = async (req, res) => {
  try {
    const eventGroup = await EventGroup.find();
    res.status(200).json(eventGroup);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetSingleEventGroup = async (req, res) => {
  try {
    const eventGroup = await EventGroup.findOne({ _id: req.params.id });
    if (!eventGroup) {
      return res
        .status(404)
        .json({ msg: `No event group with id ${req.params.id}` });
    }
    res.status(200).json(eventGroup);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetEventGroupTimes = async (req, res) => {
  try {
    let eventGroups = await EventGroup.find({ eventID: req.params.id });

    let groups = [];
    for (const key of eventGroups) {
      const count =
        (await EventReservationClient.count({
          eventID: key.eventID,
          eventGroupID: key._id,
        })) || 0;
      groups.push({ ...key._doc, count: count });
    }
    if (!eventGroups) {
      return res
        .status(404)
        .json({ msg: `No event group with id ${req.params.id}` });
    }

    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const UpdateEventGroup = async (req, res) => {
  const newObj = {};
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i];
  }
  try {
    const eventGroup = await EventGroup.findOneAndUpdate(
      { _id: req.params.id },
      newObj
    );
    if (!eventGroup) {
      return res
        .status(404)
        .json({ msg: `No event group with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Event group updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const DeleteEventGroup = async (req, res) => {
  try {
    const eventGroup = await EventGroup.findOneAndDelete({
      _id: req.params.id,
    });
    if (!eventGroup) {
      return res
        .status(404)
        .json({ msg: `No event group with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Event group deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  CreateEventGroup,
  GetEventGroups,
  GetSingleEventGroup,
  UpdateEventGroup,
  DeleteEventGroup,
  GetEventGroupTimes,
};
