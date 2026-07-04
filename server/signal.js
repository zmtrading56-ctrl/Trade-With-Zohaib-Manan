const express = require("express");
require("dotenv").config();

const { generateSignal } = require("./aiEngine");
const { getLivePrice } = require("./services/marketService");

const { saveSignal, getSignals } = require("./database/signalRepository");
const {
  updateStatistics,
  getStatistics,
} = require("./database/statisticsRepository");

const {
  addPrice,
  getHistory,
  getMultiTimeframeHistory,
} = require("./data/priceHistory");

const router = express.Router();

/* ===========================
   AI SIGNAL
=========================== */

router.get("/signal", async (req, res) => {
  try {
    const symbol = "EUR/USD";

    const candles = await getLivePrice(symbol);

    const latest = candles[candles.length - 1];

    const price = Number(latest.close);

    addPrice(price);

    const history = getHistory();

    const multiTimeframe = getMultiTimeframeHistory();

    const signal = generateSignal(price, history);

    saveSignal({
      pair: symbol,
      signal: signal.signal,
      entry: signal.entry,
      stopLoss: signal.stopLoss,
      takeProfit: signal.takeProfit,
      confidence: signal.confidence,
    });

    // Update Statistics
    updateStatistics(signal.signal.includes("BUY"));

    res.json({
      success: true,
      pair: symbol,
      ...signal,
      history: {
        m1: multiTimeframe.m1.length,
        m5: multiTimeframe.m5.length,
        m15: multiTimeframe.m15.length,
        h1: multiTimeframe.h1.length,
      },
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

/* ===========================
   SIGNAL HISTORY
=========================== */

router.get("/history", async (req, res) => {
  try {

    const rows = await getSignals();

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

/* ===========================
   LIVE STATISTICS
=========================== */

router.get("/statistics", async (req, res) => {
  try {

    const stats = await getStatistics();

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

module.exports = router;