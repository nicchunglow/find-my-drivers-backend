const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const locationModel = require("../models/locations.model");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("locations", () => {
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
        name: "somewhere",
        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      },
      {
        name: "Second Place",

        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      },
      {
        name: "New place",
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

  describe("/", () => {
    it("GET should retrieve location but with the following key:value pairs: name, coordinates", async () => {
      const mockLocationData = [
        {
          name: "somewhere",
          coordinates: {
            lat: 10,
            lng: 90.55,
          },
        },
        {
          name: "Second Place",

          coordinates: {
            lat: 10,
            lng: 90.55,
          },
        },
        {
          name: "New place",
          coordinates: {
            lat: 10,
            lng: 90.55,
          },
        },
      ];
      const { body } = await request(app).get("/locations").expect(200);
      expect(body).toMatchObject(mockLocationData);
    });
    it("DELETE should delete one location", async () => {
      const mockNameData = {
        name: "somewhere",
      };
      const mockLocationData = {
        name: "somewhere",
        coordinates: {
          lat: 10,
          lng: 90.55,
        },
      };
      const { body } = await request(app)
        .delete("/locations")
        .send(mockNameData)
        .expect(201);
      expect(body).toMatchObject(mockLocationData);
    });
  });
  describe("/create", () => {
    it("POST should post one location", async () => {
      const mockLocationData = {
        name: "somewhere new",
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
