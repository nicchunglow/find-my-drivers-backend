const express = require("express");
const router = express.Router();
const locationModel = require("../models/locations.model");

router.get("/", async (req, res) => {
  const allLocations = await locationModel.find({}).select("-_id");
  res.status(200).send(allLocations);
});

router.post("/create", async (req, res, next) => {
  if (!req.body.coordinates.lat || !req.body.coordinates.lng) {
    const err = new Error("Please fill coordinates");
    err.statusCode = 400;
    next(err);
  }
  const locationData = await {
    name: req.body.name,
    coordinates: req.body.coordinates,
  };
  const location = new locationModel(locationData);
  await locationModel.init();
  location.coordinates = req.body.coordinates;
  const newLocation = await location.save();
  res.status(201).send(newLocation);
});

router.delete("/:name", async (req, res, next) => {
  const deletedEvent = await locationModel.findOneAndDelete({
    name: req.params.name,
  });
  res.status(201).send(deletedEvent);
});

router.use((err, req, use, next) => {
  next(err);
});

module.exports = router;
