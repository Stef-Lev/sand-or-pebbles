const express = require("express");
const app = express();
const PORT = 7002;
const path = require("path");
const mongoose = require("mongoose");
const Beach = require("./models/beach");

mongoose.connect(
  "mongodb+srv://stef-lev:data4beachApp@beach-cluster.rl6k0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.send(`PORT ${PORT} listening...`);
});

app.get("/beaches", async (req, res) => {
  const beach = await Beach.find({});
  res.send(beach);
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
