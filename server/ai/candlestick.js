function detectPattern(candle) {
  const open = Number(candle.open);
  const close = Number(candle.close);
  const high = Number(candle.high);
  const low = Number(candle.low);

  if (
    Math.abs(open - close) <= (high - low) * 0.1
  ) {
    return "DOJI";
  }

  if (close > open) {
    return "BULLISH";
  }

  if (close < open) {
    return "BEARISH";
  }

  return "UNKNOWN";
}

module.exports = {
  detectPattern,
};