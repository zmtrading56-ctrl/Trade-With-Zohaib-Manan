let cache = null;
let lastUpdate = 0;

function getCache() {
  return {
    data: cache,
    lastUpdate,
  };
}

function setCache(data) {
  cache = data;
  lastUpdate = Date.now();
}

module.exports = {
  getCache,
  setCache,
};