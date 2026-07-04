const express = require("express");

const router = express.Router();

router.get("/news", (req, res) => {
  res.json({
    status: "No High Impact News",
    trading: true,
    events: [],
  });
});

module.exports = router;