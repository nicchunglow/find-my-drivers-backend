const express = require("express");
const router = express.Router();
const locationModel = require("../models/locations.model");

router.get("/", async (req, res) => {
  const allLocations = await locationModel
    .find({}, "coordinates")
    .select("-_id");
  res.status(200).send(allLocations);
});

router.use((err, req, use, next) => {
  next(err);
});

module.exports = router;
