function calculateConfidence({
  trend,
  rsi,
  ema20,
  ema50,
  macd,
  pattern,
}) {
  let confidence = 50;

  // Trend
  if (trend === "UPTREND" || trend === "DOWNTREND") {
    confidence += 15;
  }

  // RSI
  if (rsi < 30 || rsi > 70) {
    confidence += 15;
  } else if (rsi >= 40 && rsi <= 60) {
    confidence += 5;
  }

  // EMA Cross
  if (ema20 != null && ema50 != null) {
    if (ema20 > ema50 || ema20 < ema50) {
      confidence += 15;
    }
  }

  // MACD
  if (macd != null) {
    if (macd > 0 || macd < 0) {
      confidence += 10;
    }
  }

  // Candlestick Pattern
  if (pattern === "BULLISH" || pattern === "BEARISH") {
    confidence += 10;
  }

  if (confidence > 99) confidence = 99;
  if (confidence < 50) confidence = 50;

  return confidence;
}

module.exports = {
  calculateConfidence,
};