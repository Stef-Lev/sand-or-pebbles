require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const catchAsync = require("./utils/wrapAsyncError");
const ExpressError = require("./utils/ExpressError");
const PORT = 7002;
const path = require("path");
const mongoose = require("mongoose");
const Beach = require("./models/beach");
const Review = require("./models/review");
const validate = require("./utils/validate");
const formatResponse = require("./utils/formatResponse");

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

app.get(
  "/",
  catchAsync(async (req, res) => {
    res.json(formatResponse("App is running"));
  })
);

app.get(
  "/beaches",
  catchAsync(async (req, res, next) => {
    const beaches = await Beach.find({});
    res.json(formatResponse(beaches));
  })
);

app.post(
  "/beaches",
  validate,
  catchAsync(async (req, res, next) => {
    // if (!req.body) throw new ExpressError('Invalid beach data', 400)
    const beach = new Beach(req.body);
    await beach.save();
    res.json(formatResponse(beach));
  })
);

app.get(
  "/beaches/:id",
  catchAsync(async (req, res) => {
    const beach = await Beach.findById(req.params.id);
    res.json(formatResponse(beach));
  })
);

app.put(
  "/beaches/:id",
  validate,
  catchAsync(async (req, res) => {
    const beach = await Beach.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, useFindAndModify: false }
    );
    res.json(formatResponse(beach));
  })
);

app.delete(
  "/beaches/:id",
  catchAsync(async (req, res) => {
    await Beach.findByIdAndDelete(req.params.id);
    res.json("DELETED BEACH");
  })
);

app.post(
  "/beaches/:id/reviews",
  catchAsync(async (req, res) => {
    const beach = await Beach.findById(req.params.id);
    const review = new Review(req.body);
    beach.reviews.push(review);
    await review.save();
    await beach.save();
    res.json(formatResponse({review, beach}));
  })
);

// TODO: Check if this is needed
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  switch (err.name) {
    case "CastError":
      res
        .status(500)
        .json(
          new ExpressError(undefined, err.name, "Beach ID is not valid", 500)
        );
      break;
    case "ValidationError":
      res
        .status(400)
        .json(new ExpressError(undefined, err.name, err.message, 403));
      break;
    default:
      res.status(500).json(new ExpressError(err.name, "Something went wrong"));
  }
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
