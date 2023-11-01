const Timing = require("../model/timing");

const CreateTiming = async (req, res) => {
  const data = req.body;
  try {
    const timing = await Timing.create({
      eventId: data.eventId,
      priorEventStartTime: data.priorEventStartTime,
      priorEventEndTime: data.priorEventEndTime,
      eventStartTime: data.eventStartTime,
      eventEndTime: data.eventEndTime,
      afterEventStartTime: data.afterEventStartTime,
      afterEventEndTime: data.afterEventEndTime,
      capacity: data.capacity,
    });
    res.status(201).json({
      message: "Timing added successfully",
      id: timing._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetTimings = async (req, res) => {
  try {
    const timing = await Timing.find().populate({ path: "eventId" });
    res.status(200).json(timing);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetSingleTiming = async (req, res) => {
  try {
    const timing = await Timing.findOne({ _id: req.params.id });
    if (!timing) {
      return res
        .status(404)
        .json({ msg: `No timing with id ${req.params.id}` });
    }
    res.status(200).json(timing);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetSingleTimingByEventId = async (req, res) => {
  try {
    const timing = await Timing.findOne({ eventId: req.params.id });
    if (!timing) {
      return res
        .status(404)
        .json({ msg: `No timing with id ${req.params.id}` });
    }
    res.status(200).json(timing);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const UpdateTiming = async (req, res) => {
  const newObj = {};
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i];
  }
  try {
    const timing = await Timing.findOneAndUpdate(
      { _id: req.params.id },
      newObj
    );
    if (!timing) {
      return res
        .status(404)
        .json({ msg: `No timing with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Timing updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const DeleteTiming = async (req, res) => {
  try {
    const timing = await Timing.findOneAndDelete({ _id: req.params.id });
    if (!timing) {
      return res
        .status(404)
        .json({ msg: `No timing with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Timing deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  CreateTiming,
  GetTimings,
  GetSingleTiming,
  UpdateTiming,
  DeleteTiming,
  GetSingleTimingByEventId,
};
