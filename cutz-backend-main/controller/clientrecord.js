const ClientRecord = require("../model/clientsrecord");
const GetAllClientRecords = async (req, res) => {
  try {
    const clients = await ClientRecord.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
module.exports = {
  GetAllClientRecords,
};
