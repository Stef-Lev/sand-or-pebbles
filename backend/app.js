require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 7002;
const path = require("path");
const mongoose = require("mongoose");
const Beach = require("./models/beach");

mongoose.connect(
  process.env.MONGO_URL,
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
  res.send(`PORT ${PORT} listening...`);
});

app.get("/beaches", async (req, res) => {
  const beaches = await Beach.find({});
  res.send(beaches);
});

app.post("/beaches", async (req, res) => {
  const beach = new Beach(req.body);
  await beach.save();
});

app.get("/beaches/:id", async (req, res) => {
  const beach = await Beach.findById(req.params.id);
  res.send(beach);
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
