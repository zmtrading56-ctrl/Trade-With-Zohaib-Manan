const express = require("express");
const { getHistory } = require("./data/signalHistory");

const router = express.Router();

router.get("/history", (req, res) => {
  res.json({
    success: true,
    history: getHistory(),
  });
});

module.exports = router;