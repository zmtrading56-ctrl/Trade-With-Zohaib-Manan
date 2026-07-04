const { calculateEMA } = require("./ema");

function calculateMACD(prices) {
  if (prices.length < 35) {
    return null;
  }

  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);

  if (ema12 == null || ema26 == null) {
    return null;
  }

  const macd = ema12 - ema26;

  return Number(macd.toFixed(5));
}

module.exports = {
  calculateMACD,
};