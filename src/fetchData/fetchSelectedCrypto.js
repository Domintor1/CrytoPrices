const fetchSelectedCrypto = async ({ queryKey }) => {
  const id = queryKey[1];
  const fetchedCoins = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}
      `
  );
  if (!fetchedCoins.ok) {
    throw new Error(`error fetching ${id} coins from API`);
  }
  return fetchedCoins.json();
};

export default fetchSelectedCrypto;
