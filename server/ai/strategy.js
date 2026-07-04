function calculateScore({
  trend,
  rsi,
  ema20,
  ema50,
  macd,
  pattern,
}) {
  let score = 0;

  // Trend (High Weight)
  if (trend === "UPTREND") {
    score += 30;
  } else if (trend === "DOWNTREND") {
    score -= 30;
  }

  // RSI
  if (rsi >= 40 && rsi <= 60) {
    score += 10;
  } else if (rsi < 30) {
    score += 25;
  } else if (rsi > 70) {
    score -= 25;
  }

  // EMA Trend
  if (ema20 != null && ema50 != null) {
    if (ema20 > ema50) {
      score += 20;
    } else if (ema20 < ema50) {
      score -= 20;
    }
  }

  // MACD Confirmation
  if (macd != null) {
    if (macd > 0) {
      score += 15;
    } else if (macd < 0) {
      score -= 15;
    }
  }

  // Candlestick Pattern
  switch (pattern) {
    case "BULLISH":
      score += 15;
      break;

    case "BEARISH":
      score -= 15;
      break;

    case "DOJI":
      score += 0;
      break;
  }

  // Clamp
  score = Math.max(-100, Math.min(100, score));

  return score;
}

module.exports = {
  calculateScore,
};