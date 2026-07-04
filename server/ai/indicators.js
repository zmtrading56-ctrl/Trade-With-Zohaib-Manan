function calculateTrend(currentPrice, previousPrice) {
  if (currentPrice > previousPrice) {
    return "UPTREND";
  }

  if (currentPrice < previousPrice) {
    return "DOWNTREND";
  }

  return "SIDEWAYS";
}

module.exports = {
  calculateTrend,
};