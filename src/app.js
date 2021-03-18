require("dotenv");
const express = require("express");
const cors = require("cors");
const locationsRouter = require("./routes/locations.route");

const app = express();

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  allowedHeaders: "content-type",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/locations", locationsRouter);

app.get("/", (req, res) => {
  res.send({
    0: "GET   /",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  if (err.statusCode) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "internal server error" });
  }
});
module.exports = app;