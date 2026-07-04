const express = require("express");
const axios = require("axios");
require("dotenv").config();

const markets = require("./markets");
const { getCache, setCache } = require("./cache/marketCache");

const router = express.Router();

router.get("/market", async (req, res) => {
  try {
    const { data, lastUpdate } = getCache();

    // Cache 30 Seconds
    if (data && Date.now() - lastUpdate < 30000) {
      return res.json(data);
    }

    const apiKey = process.env.TWELVE_DATA_API_KEY;

    const requests = markets.map((symbol) =>
      axios.get(
        `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(
          symbol
        )}&apikey=${apiKey}`
      )
    );

    const responses = await Promise.all(requests);

    const result = {};

    responses.forEach((response, index) => {
      const d = response.data;

      const open = Number(d.open || 0);
      const close = Number(d.close || 0);

      let signal = "WAIT";
      let confidence = "50%";

      if (close > open) {
        signal = "BUY";
        confidence = "92%";
      } else if (close < open) {
        signal = "SELL";
        confidence = "92%";
      }

      result[markets[index]] = {
        symbol: markets[index],
        close: close,
        open: open,
        high: Number(d.high || 0),
        low: Number(d.low || 0),
        signal,
        confidence,
      };
    });

    setCache(result);

    res.json(result);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch market data",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;