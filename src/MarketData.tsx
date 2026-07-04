import { useEffect, useState } from "react";

function MarketData() {
  const [markets, setMarkets] = useState<any>(null);

  useEffect(() => {
    async function loadMarket() {
      try {
        const response = await fetch("http://localhost:5000/api/market");
        const data = await response.json();

        setMarkets(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMarket();

    // Auto Refresh Every 5 Seconds
    const interval = setInterval(loadMarket, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!markets) {
    return (
      <div className="market-card">
        <h2>📈 Live Market</h2>
        <p>Loading Live Prices...</p>
      </div>
    );
  }

  return (
    <div className="market-card">

      <h2>📈 Live Forex Market</h2>

      {Object.entries(markets).map(([pair, data]: any) => (
        <div
          key={pair}
          style={{
            border: "1px solid #333",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: "#1b1b1b",
            color: "#fff",
          }}
        >
          <h3>{pair}</h3>

          <p>💲 Price : {data.close}</p>

          <p>🟢 Open : {data.open}</p>

          <p>📈 High : {data.high}</p>

          <p>📉 Low : {data.low}</p>

          <p>
            Status :
            {Number(data.close) > Number(data.open)
              ? " 🟢 Bullish"
              : " 🔴 Bearish"}
          </p>

        </div>
      ))}
    </div>
  );
}

export default MarketData;