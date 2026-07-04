function TradingChart() {
  return (
    <div
      className="chart-card"
      style={{
        background: "#121212",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          color: "white",
          padding: "15px",
          margin: 0,
          textAlign: "center",
        }}
      >
        📈 Live EUR/USD Trading Chart
      </h2>

      <iframe
        title="TradingView"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview&symbol=FX:EURUSD&interval=15&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=1e222d&theme=dark&style=1&timezone=Etc/UTC&studies=[]&hideideas=1"
        width="100%"
        height="650"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default TradingChart;