const history = [];

function addPrice(price) {
  history.push(price);

  // صرف آخری 500 قیمتیں رکھو
  while (history.length > 500) {
    history.shift();
  }
}

function getHistory() {
  return history;
}

function getMultiTimeframeHistory() {
  return {
    m1: history.slice(-100),
    m5: history.slice(-100),
    m15: history.slice(-100),
    h1: history.slice(-100),
  };
}

module.exports = {
  addPrice,
  getHistory,
  getMultiTimeframeHistory,
};