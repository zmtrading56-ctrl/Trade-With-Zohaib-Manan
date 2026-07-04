function calculateRSI(prices) {
  if (prices.length < 15) {
    return 50;
  }

  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];

    if (diff > 0) {
      gains += diff;
    } else {
      losses += Math.abs(diff);
    }
  }

  const avgGain = gains / 14;
  const avgLoss = losses / 14;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;

  return Number((100 - 100 / (1 + rs)).toFixed(2));
}

module.exports = { calculateRSI };