const express = require("express");
const router = express.Router();

// Temporary simulated economic events (we will replace with real API later)
const events = [
  {
    name: "US CPI",
    impact: "HIGH",
    time: "2026-01-25T14:30:00Z",
  },
  {
    name: "FOMC Meeting",
    impact: "HIGH",
    time: "2026-01-31T18:00:00Z",
  },
  {
    name: "NFP",
    impact: "HIGH",
    time: "2026-02-02T13:30:00Z",
  },
];

router.get("/news", (req, res) => {
  const now = new Date();

  const upcoming = events.filter((e) => new Date(e.time) > now);

  let tradingAllowed = true;

  // If any HIGH impact news in next 60 minutes → block trading
  upcoming.forEach((e) => {
    const diff = (new Date(e.time) - now) / (1000 * 60);

    if (e.impact === "HIGH" && diff <= 60) {
      tradingAllowed = false;
    }
  });

  res.json({
    trading: tradingAllowed,
    events: upcoming,
  });
});

module.exports = router;