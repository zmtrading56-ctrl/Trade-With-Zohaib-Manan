function App() {
  return (
    <div className="app">

      <header className="header">
        <h1>Trade With Zohaib Manan</h1>
        <p>AI Forex Trading Platform</p>
      </header>

      <div className="dashboard">

        <aside className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li>Dashboard</li>
            <li>AI Signals</li>
            <li>Market Data</li>
            <li>TradingView</li>
            <li>News</li>
            <li>Learning</li>
            <li>Settings</li>
          </ul>
        </aside>


        <main className="content">

          <div className="cards">

            <div className="card">
              <h3>AI Signal System</h3>
              <p>Waiting for market analysis...</p>
            </div>

            <div className="card">
              <h3>Live Market</h3>
              <p>EUR/USD • GBP/USD • XAU/USD</p>
            </div>

            <div className="card">
              <h3>TradingView Chart</h3>
              <p>Chart integration coming soon</p>
            </div>

          </div>

          <footer>
            Built by Zohaib Manan
          </footer>

        </main>

      </div>

    </div>
  )
}

export default App