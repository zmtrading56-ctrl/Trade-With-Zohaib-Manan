const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected Successfully",
    version: "1.0.0",
  });
});

module.exports = router;