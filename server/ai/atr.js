function calculateATR(prices, period = 14) {
  if (!prices || prices.length < period + 1) {
    return null;
  }

  let total = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    total += Math.abs(prices[i] - prices[i - 1]);
  }

  return Number((total / period).toFixed(5));
}

module.exports = {
  calculateATR,
};