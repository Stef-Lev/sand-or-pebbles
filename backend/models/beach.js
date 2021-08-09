const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: String,
  location: String,
  imageUrl: {
    type: String,
    required: [true, 'Title is required']
  }
});

module.exports = mongoose.model("Beach", BeachSchema);
