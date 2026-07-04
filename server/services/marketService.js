const axios = require("axios");
require("dotenv").config();

async function getLivePrice(symbol = "EUR/USD") {
  const url =
    `https://api.twelvedata.com/time_series` +
    `?symbol=${encodeURIComponent(symbol)}` +
    `&interval=1min` +
    `&outputsize=100` +
    `&apikey=${process.env.TWELVE_DATA_API_KEY}`;

  const response = await axios.get(url);

  if (!response.data || !response.data.values) {
    throw new Error("Failed to fetch candles");
  }

  return response.data.values.reverse();
}

module.exports = {
  getLivePrice,
};