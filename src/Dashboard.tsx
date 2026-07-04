import Navbar from "./Navbar";
import AISignal from "./AISignal";
import MarketData from "./MarketData";
import TradingChart from "./TradingChart";
import ForexNews from "./ForexNews";
import LearningCenter from "./LearningCenter";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import Settings from "./Settings";
import Footer from "./Footer";
import AdSection from "./AdSection";
import Signup from "./Signup";
import Profile from "./Profile";
import BrokerDashboard from "./BrokerDashboard";
import SignalHistory from "./SignalHistory";

function Dashboard() {
  return (
    <div className="app">
      <Navbar />

      <div className="dashboard">
        <aside className="sidebar">
          <TradingChart />

          <ForexNews />

          <LearningCenter />

          <Login />

          <Signup />

          <Profile />

          <AdminPanel />

          <Settings />

          <AdSection />

          <Footer />
        </aside>

        <main className="content">
          {/* Live Market Board */}
          <div className="card">
            <h2>📈 Live Market Board</h2>

            <MarketData />
          </div>

          {/* AI Signal */}
          <div className="card">
            <AISignal />
          </div>

          {/* AI Analysis */}
          <div className="card">
            <h2>🤖 AI Market Analysis</h2>

            <p>
              AI continuously scans Trend, RSI, EMA, MACD,
              Candlestick Patterns, Support & Resistance
              to generate real-time trading signals.
            </p>
          </div>

          {/* Trading Chart */}
          <div className="card">
            <h2>📊 Live Trading Chart</h2>

            <TradingChart />
          </div>

          {/* Broker */}
          <div className="card">
            <BrokerDashboard />
          </div>

          {/* Forex News */}
          <div className="card">
            <h2>📰 Forex News</h2>

            <ForexNews />
          </div>

          {/* Signal History */}
          <div className="card">
            <SignalHistory />
          </div>

          {/* Trading Statistics */}
          <div className="card">
            <h2>📊 Trading Statistics</h2>

            <p>Daily Accuracy : 96%</p>
            <p>Signals Today : 42</p>
            <p>Winning Trades : 38</p>
            <p>Losing Trades : 4</p>
          </div>

          <footer
            style={{
              marginTop: "30px",
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            © 2026 Trade With Manan | AI Forex Pro
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;