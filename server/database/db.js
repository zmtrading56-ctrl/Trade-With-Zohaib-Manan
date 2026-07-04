const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tradewithmanan.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("✅ SQLite Connected");
  }
});

db.serialize(() => {

  // Signals Table
  db.run(`
    CREATE TABLE IF NOT EXISTS signals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pair TEXT,
      signal TEXT,
      entry REAL,
      stopLoss REAL,
      takeProfit REAL,
      confidence TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Statistics Table
  db.run(`
    CREATE TABLE IF NOT EXISTS statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      totalSignals INTEGER DEFAULT 0,
      winningTrades INTEGER DEFAULT 0,
      losingTrades INTEGER DEFAULT 0,
      accuracy REAL DEFAULT 0
    )
  `);

});

module.exports = db;