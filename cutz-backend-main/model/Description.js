const mongoose = require("mongoose");

// ID
// description

const Description = new mongoose.Schema({
  descriptionID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
});

module.exports = mongoose.model("Description", Description);
