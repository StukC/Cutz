const Description = require("../model/Description");
const EventReservationClient = require("../model/eventreservationclient");
const AddDescription = async (req, res) => {
  const data = req.body;
  try {
    const descriptionRes = await Description.create({
      description: data.description,
    });
    res.status(201).json({
      message: "Description added successfully",
      id: descriptionRes._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
const GetDescription = async (req, res) => {
  try {
    const events = await Description.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
const UpdateDescription = async (req, res) => {
  try {
    const descriptionUpdateResult = await Description.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!descriptionUpdateResult) {
      return res
        .status(404)
        .json({ msg: `No Description with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Description updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  AddDescription,
  GetDescription,
  UpdateDescription,
};
