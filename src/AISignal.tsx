import { useEffect, useState } from "react";

function AISignal() {
  const [signal, setSignal] = useState<any>(null);

  useEffect(() => {
    async function loadSignal() {
      try {
        const response = await fetch("http://localhost:5000/api/signal");
        const data = await response.json();

        setSignal(data);
      } catch (error) {
        console.error("AI Signal Error:", error);
      }
    }

    // پہلی بار Load
    loadSignal();

    // ہر 5 سیکنڈ بعد Auto Refresh
    const interval = setInterval(loadSignal, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!signal) {
    return (
      <div className="signal-card">
        <h2>AI Auto Signal</h2>
        <p>Loading AI Signal...</p>
      </div>
    );
  }

  return (
    <div className="signal-card">

      <h2>🤖 AI Auto Signal</h2>

      <h3>{signal.pair}</h3>

      <h1>{signal.signal}</h1>

      <hr />

      <p><strong>Entry:</strong> {signal.entry}</p>

      <p><strong>Stop Loss:</strong> {signal.stopLoss}</p>

      <p><strong>Take Profit:</strong> {signal.takeProfit}</p>

      <p><strong>Confidence:</strong> {signal.confidence}</p>

      <p><strong>Trend:</strong> {signal.trend}</p>

      <p><strong>Score:</strong> {signal.score}</p>

      <p><strong>RSI:</strong> {signal.rsi}</p>

      <p><strong>EMA 20:</strong> {signal.ema20 ?? "Calculating..."}</p>

      <p><strong>EMA 50:</strong> {signal.ema50 ?? "Calculating..."}</p>

      <p><strong>MACD:</strong> {signal.macd ?? "Calculating..."}</p>

      <p><strong>Pattern:</strong> {signal.pattern}</p>

      <p><strong>Support:</strong> {signal.support}</p>

      <p><strong>Resistance:</strong> {signal.resistance}</p>

      <p><strong>Risk Reward:</strong> {signal.riskReward}</p>

      <hr />

      <h3>📊 Market Status</h3>

      <p>
        {signal.signal === "STRONG BUY"
          ? "🟢 Strong Bullish Market"
          : signal.signal === "BUY"
          ? "🟢 Bullish"
          : signal.signal === "STRONG SELL"
          ? "🔴 Strong Bearish Market"
          : signal.signal === "SELL"
          ? "🔴 Bearish"
          : "🟡 Waiting For Confirmation"}
      </p>

    </div>
  );
}

export default AISignal;