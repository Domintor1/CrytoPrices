const fetchChartData = async ({ queryKey }) => {
  const id = queryKey[1];
  const fetchedChartData = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
  );
  if (!fetchedChartData.ok) {
    throw new Error(`error fetching ${id} coins from API`);
  }
  return fetchedChartData.json();
};
//
export default fetchChartData;
