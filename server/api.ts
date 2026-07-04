const API_URL = "http://localhost:5000/api";

export async function getBackendStatus() {
  const response = await fetch(`${API_URL}/status`);
  return response.json();
}

export async function getMarketData() {
  const response = await fetch(`${API_URL}/market`);
  return response.json();
}

export async function getSignal() {
  const response = await fetch(`${API_URL}/signal`);
  return response.json();
}