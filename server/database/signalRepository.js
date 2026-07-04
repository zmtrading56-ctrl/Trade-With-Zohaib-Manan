const db = require("./db");

function saveSignal(signal) {
  db.run(
    `
    INSERT INTO signals
    (pair, signal, entry, stopLoss, takeProfit, confidence)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      signal.pair,
      signal.signal,
      signal.entry,
      signal.stopLoss,
      signal.takeProfit,
      signal.confidence,
    ],
    (err) => {
      if (err) {
        console.error("SQLite Error:", err.message);
      }
    }
  );
}

function getSignals(limit = 20) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM signals
      ORDER BY id DESC
      LIMIT ?
      `,
      [limit],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

module.exports = {
  saveSignal,
  getSignals,
};