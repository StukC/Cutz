const VolunteerRecord = require("../model/volunteersrecord");
const GetAllVolunteerRecords = async (req, res) => {
  try {
    const clients = await VolunteerRecord.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
module.exports = {
  GetAllVolunteerRecords,
};
