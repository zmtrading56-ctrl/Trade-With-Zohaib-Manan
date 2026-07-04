const db = require("./db");

function updateStatistics(isWin = false) {

  db.get("SELECT * FROM statistics LIMIT 1", (err, row) => {

    if (err) {
      return console.error(err.message);
    }

    if (!row) {

      db.run(`
        INSERT INTO statistics
        (totalSignals, winningTrades, losingTrades, accuracy)
        VALUES (1, ?, ?, ?)
      `,
      [
        isWin ? 1 : 0,
        isWin ? 0 : 1,
        isWin ? 100 : 0,
      ]);

      return;
    }

    const total = row.totalSignals + 1;
    const wins = row.winningTrades + (isWin ? 1 : 0);
    const losses = row.losingTrades + (isWin ? 0 : 1);

    const accuracy = Number(((wins / total) * 100).toFixed(2));

    db.run(
      `
      UPDATE statistics
      SET
      totalSignals=?,
      winningTrades=?,
      losingTrades=?,
      accuracy=?
      WHERE id=?
      `,
      [
        total,
        wins,
        losses,
        accuracy,
        row.id,
      ]
    );

  });

}

function getStatistics() {

  return new Promise((resolve, reject) => {

    db.get(
      "SELECT * FROM statistics LIMIT 1",
      (err, row) => {

        if (err) {
          reject(err);
        } else {
          resolve(row || {
            totalSignals: 0,
            winningTrades: 0,
            losingTrades: 0,
            accuracy: 0,
          });
        }

      }
    );

  });

}

module.exports = {
  updateStatistics,
  getStatistics,
};