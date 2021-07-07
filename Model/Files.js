const mongoose = require("mongoose");

const file = new mongoose.Schema({
  title: String,
  fID: String,
  filename: String,
  entryDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
});
module.exports = mongoose.model("Flie", file);
