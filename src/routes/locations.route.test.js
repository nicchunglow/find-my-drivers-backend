const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const locationModel = require("../models/locations.model");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("Locations", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(mongoUri);
    } catch (err) {
      console.error(err);
    }
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.stop();
  });

  beforeEach(async () => {
    const locationData = [
      {
        locationId: 1,
        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      },
      {
        locationId: 2,

        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      },
      {
        locationId: 3,
        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      },
    ];
    await locationModel.create(locationData);
  });
  afterEach(async () => {
    jest.resetAllMocks();
    await locationModel.deleteMany();
  });

  describe("/locations", () => {
    it("GET should retrieve location but with the following key:value pairs: coordinates", async () => {
      const mockLocationData = [
        {
          coordinates: {
            lat: 10,
            lng: 90.55,
          },
        },
        {
          coordinates: {
            lat: 10,
            lng: 90.55,
          },
        },
        {
          coordinates: {
            lat: 10,
            lng: 90.55,
          },
        },
      ];
      const { body: coordinates } = await request(app)
        .get("/locations")
        .expect(200);
      expect(coordinates).toMatchObject(mockLocationData);
    });
    it("DELETE should delete one location", async () => {
      const { body: locationId } = await request(app)
        .delete("/locations/1")
        .expect(201);
    });
  });
  describe("/create", () => {
    it("POST should post one location", async () => {
      const mockLocationData = {
        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      };
      const { body: coordinates } = await request(app)
        .post("/locations/create")
        .send(mockLocationData)
        .expect(201);
      expect(coordinates).toMatchObject(mockLocationData);
    });
  });
});
