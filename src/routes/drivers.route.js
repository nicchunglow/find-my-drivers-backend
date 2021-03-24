const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  let count = req.query.count;
  let lat = req.query.latitude;
  let lng = req.query.longitude;
  const url = `https://qa-interview-test.splytech.dev/api/drivers?latitude=${lat}&longitude=${lng}&count=${count}`;
  axios.get(url).then((response) => {
    res.send(response.data);
  });
});

module.exports = router;
