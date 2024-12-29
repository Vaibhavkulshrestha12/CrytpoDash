const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoData() {
  const response = await fetch(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=true`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data');
  }
  
  return response.json();
}

export async function fetchTrendingCoins() {
  const response = await fetch(`${COINGECKO_API}/search/trending`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending coins');
  }
  
  return response.json();
}