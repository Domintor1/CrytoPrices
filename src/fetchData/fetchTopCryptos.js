const fetchTopCryptos = async ({}) => {
  const fetchedCoins = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  if (!fetchedCoins.ok) {
    throw new Error("error fetching coins from API");
  }
  return fetchedCoins.json();
};

export default fetchTopCryptos;
