function calculateSupportResistance(prices) {
  if (!prices || prices.length < 10) {
    return {
      support: null,
      resistance: null,
    };
  }

  const sorted = [...prices].sort((a, b) => a - b);

  const support =
    sorted[Math.floor(sorted.length * 0.1)];

  const resistance =
    sorted[Math.floor(sorted.length * 0.9)];

  return {
    support: Number(support.toFixed(5)),
    resistance: Number(resistance.toFixed(5)),
  };
}

module.exports = {
  calculateSupportResistance,
};