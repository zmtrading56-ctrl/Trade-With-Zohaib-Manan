const { calculateTrend } = require("./ai/indicators");
const { calculateRSI } = require("./ai/rsi");
const { calculateEMA } = require("./ai/ema");
const { calculateMACD } = require("./ai/macd");
const { detectPattern } = require("./ai/candlestick");
const { calculateScore } = require("./ai/strategy");
const { calculateSupportResistance } = require("./ai/supportResistance");
const { calculateConfidence } = require("./ai/confidence");
const { calculateTrendStrength } = require("./ai/trendStrength");

function generateSignal(price, history = []) {

  const previousPrice =
    history.length > 1
      ? history[history.length - 2]
      : price;

  const trend = calculateTrend(price, previousPrice);

  const prices =
    history.length >= 100
      ? history.slice(-100)
      : [...history];

  if (prices.length === 0) {
    prices.push(price);
  }

  // Trend Strength
  const trendStrength = calculateTrendStrength(prices);

  const sr = calculateSupportResistance(prices);

  const rsi = calculateRSI(prices);

  const ema20 = calculateEMA(prices, 20);

  const ema50 = calculateEMA(prices, 50);

  const macd = calculateMACD(prices);

  const pattern = detectPattern({
    open: previousPrice,
    close: price,
    high: Math.max(price, previousPrice),
    low: Math.min(price, previousPrice),
  });

  const score = calculateScore({
    trend,
    rsi,
    ema20,
    ema50,
    macd,
    pattern,
  });

  const confidence = calculateConfidence({
    trend,
    rsi,
    ema20,
    ema50,
    macd,
    pattern,
  });

  let signal = "WAIT";

  if (score >= 70) {
    signal = "STRONG BUY";
  } else if (score >= 30) {
    signal = "BUY";
  } else if (score <= -70) {
    signal = "STRONG SELL";
  } else if (score <= -30) {
    signal = "SELL";
  }

  const entry = Number(price.toFixed(5));

  const stopLoss = signal.includes("BUY")
    ? Number((price - 0.0020).toFixed(5))
    : Number((price + 0.0020).toFixed(5));

  const takeProfit = signal.includes("BUY")
    ? Number((price + 0.0040).toFixed(5))
    : Number((price - 0.0040).toFixed(5));

  return {
    signal,
    confidence: `${confidence}%`,
    score,
    trend,
    trendStrength,
    rsi,
    ema20,
    ema50,
    macd,
    pattern,
    support: sr.support,
    resistance: sr.resistance,
    entry,
    stopLoss,
    takeProfit,
    riskReward: "1:2",
  };
}

module.exports = {
  generateSignal,
};