const history = [];

function addSignal(signal) {
  history.unshift({
    ...signal,
    time: new Date().toLocaleString(),
  });

  if (history.length > 100) {
    history.pop();
  }
}

function getHistory() {
  return history;
}

module.exports = {
  addSignal,
  getHistory,
};