const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  sandQuality: {
    type: Number,
  },
});

module.exports = mongoose.model("Beach", BeachSchema);
