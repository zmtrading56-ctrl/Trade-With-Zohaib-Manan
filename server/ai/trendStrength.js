function calculateTrendStrength(prices) {
  if (!prices || prices.length < 20) {
    return 0;
  }

  const first = prices[0];
  const last = prices[prices.length - 1];

  const change = ((last - first) / first) * 100;

  return Number(change.toFixed(2));
}

module.exports = {
  calculateTrendStrength,
};