const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", async (req, res) => {
  let count = req.query.count;
  let lat = req.query.latitude;
  let lng = req.query.longitude;
  const url = `https://qa-interview-test.splytech.dev/api/drivers?latitude=${lat}&longitude=${lng}&count=${count}`;
  request(url).pipe(res);
});

module.exports = router;
