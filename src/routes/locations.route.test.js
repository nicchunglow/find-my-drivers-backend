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
        coordinates: {
          lng: 90.55,
          lat: 10,
        },
      },
      {
        coordinates: {
          lng: 90.55,
          lat: 10,
        },
      },
      {
        coordinates: {
          lng: 90.55,
          lat: 10,
        },
      },
    ];
    await locationModel.create(locationData);
  });
  afterEach(async () => {
    jest.resetAllMocks();
    await locationModel.deleteMany();
  });
  it("should pass the test", () => {
    expect(1).toBe(1);
  });

  describe("/locations", () => {
    it("GET should retrieve location but with the following key:value pairs: coordinates", async () => {
      const mockLocationData = [
        {
          coordinates: {
            lng: 90.55,
            lat: 10,
          },
        },
        {
          coordinates: {
            lng: 90.55,
            lat: 10,
          },
        },
        {
          coordinates: {
            lng: 90.55,
            lat: 10,
          },
        },
      ];
      const { body: coordinates } = await request(app)
        .get("/locations")
        .expect(200);
      expect(coordinates).toMatchObject(mockLocationData);
    });
  });
});