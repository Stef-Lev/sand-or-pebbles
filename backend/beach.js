const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: String,
  description: String,
  location: String,
});
