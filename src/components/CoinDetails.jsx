import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchSelectedCrypto from "../fetchData/fetchSelectedCrypto";
import fetchChartData from "../fetchData/fetchChartData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RoundNum(num) {
  return Math.round(num * 10000) / 10000;
}

function BillionToReadable(num) {
  return RoundNum(num / 1000000000);
}

function MillionToReadable(num) {
  return RoundNum(num / 1000000);
}

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["selectedCrypto", id], fetchSelectedCrypto);
  const chartData = useQuery(["chartData", id], fetchChartData);
  const data1 = chartData?.data?.prices.map((item) => {
    return item;
  });

  console.log(data1, "this is the chart data");

  const data = data1?.map((item) => {
    const [dateData, priceData] = item;
    const newDate = new Date(dateData);
    const formatDate = newDate.toISOString().split("T")[0];

    console.log(priceData);
    return {
      name: formatDate,
      price: RoundNum(priceData),
    };
  });

  if (results.isLoading)
    return (
      <div className="p-4 flex justify-center align-middle text-8xl">
        <h2 className="animate-spin">🌀</h2>
      </div>
    );

  return (
    <div className="justify-center">
      <div className="my-8 text-center">
        <img
          className="w-20 h-20 m-auto my-4"
          src={results?.data?.image?.small}
          alt={results?.data?.name}
        />
        <span className="font-extrabold">
          {results?.data?.name} ({results?.data?.symbol})
        </span>
      </div>

      <div>
        <ResponsiveContainer className="m-auto" width="75%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <main className="p-5 m-auto">
        <h1 className="text-3xl font-semibold my-8 text-center">
          MARKET STATS
        </h1>

        <div className="flex flex-col align-middle justify-start items-center text-center">
          <div className="flex space-x-52 p-4 border-b-2">
            <h5 className="text-left"> Rank </h5>
            <span className="w-16 md:w-32 lg:w-48">
              {" "}
              {results?.data?.market_cap_rank}
            </span>
          </div>

          <div className="flex space-x-52 p-4 border-b-2">
            <h5 className="text-left"> Market Cap </h5>
            <span className="w-12 md:w-32 lg:w-48">
              ${BillionToReadable(results?.data?.market_data.market_cap?.usd)}B
            </span>
          </div>

          <div className="flex space-x-52 p-4 border-b-2">
            <h5> Supply </h5>
            <span className="w-12 md:w-32 lg:w-48">
              $
              {MillionToReadable(
                results?.data?.market_data?.circulating_supply
              )}
              M BTC
            </span>
          </div>

          <div className="flex space-x-52 p-4 border-b-2">
            <h5> 24hr high </h5>
            <span className="w-12 md:w-32 lg:w-48">
              ${results?.data?.market_data.high_24h?.usd}
            </span>
          </div>

          <div className="flex space-x-52 p-4 border-b-2">
            <h5> 24hr low </h5>
            <span className="w-12 md:w-32 lg:w-48">
              ${results?.data?.market_data.low_24h?.usd}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;
