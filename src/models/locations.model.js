const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinatesSchema = {
  lng: {
    type: Number,
    min: -180,
    max: 180,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
  },
};
const locationSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    immutable: true,
  },
  coordinates: coordinatesSchema,
});

const locationModel = mongoose.model("createLocation", locationSchema);

module.exports = locationModel;
