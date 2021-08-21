require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const catchAsync = require('./utils/wrapAsyncError');
const ExpressError = require('./utils/ExpressError');
const PORT = 7002;
const path = require("path");
const mongoose = require("mongoose");
const Beach = require("./models/beach");
const validate = require('./utils/validate');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const headers = req.headers["accept-language"];
  res.json(`PORT ${PORT} listening... Locale ==> ${headers}`);
});

app.get("/beaches", catchAsync(async (req, res, next) => {
  const beaches = await Beach.find({});
  res.json(beaches);
}));

app.post("/beaches", validate(), catchAsync(async (req, res, next) => {
  // if (!req.body) throw new ExpressError('Invalid beach data', 400)
  const beach = new Beach(req.body);
  await beach.save();
  res.json(req.body);
}));

app.get("/beaches/:id", catchAsync(async (req, res) => {
  const beach = await Beach.findById(req.params.id);
  res.json(beach);
}));

app.put("/beaches/:id", validate(), catchAsync(async (req, res) => {
  const beach = await Beach.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, useFindAndModify: false }
  );
  res.json(beach);
}));

app.delete("/beaches/:id", catchAsync(async (req, res) => {
  await Beach.findByIdAndDelete(req.params.id);
  res.json("DELETED BEACH");
}));
// TODO: Check if this is needed
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json(message);
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

// TODO: Add frontend and backend validation 