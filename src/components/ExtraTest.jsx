import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import fetchTopCryptos from "../fetchData/fetchTopCryptos";

const ExtraTest = () => {
  const topCryptos = useQuery(["topCryptos"], fetchTopCryptos);
  console.log(topCryptos?.data, "data");

  function RoundNum(num) {
    return Math.round(num * 100) / 100;
  }

  function BillionToReadable(num) {
    return RoundNum(num / 1000000000);
  }

  function PlusOrMinus(num) {
    return num > 0 ? "+" + num : num;
  }

  return (
    <div>
      <section className="m-0 p-0 lg:m-8 p-10">
        <h1 className="text-center text-lg font-mono font-bold">
          Cryptocurrency Price List
        </h1>
        <h2 className="text-center text-lg font-mono font-bold">
          {" "}
          Top 20 coins by market cap
        </h2>
      </section>

      <main className="flex justify-center">
        <table className="table-auto border-separate">
          <thead className="text-left text-xs text-gray-600">
            <tr>
              <th className="w-96">Crypto</th>
              <th className="w-40">Price</th>
              <th className="w-40">Change</th>
              <th className="hidden md:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {topCryptos.data?.slice(0, 20).map((coin, index) => {
              return (
                <tr key={index}>
                  <td>
                    {/* Alter format to be responsive for mobile devices */}
                    <div className="md:hidden mt-5">
                      <span className="font-serif font-bold">{coin?.name}</span>
                      <span className="flex flex-col font-light text-xs">
                        {coin?.symbol}
                      </span>
                    </div>

                    {/* Alter format to be responsive for mobile devices */}
                    <div
                      className="inline-block items-center md:flex"
                      key={coin.id}
                    >
                      <Link to={`details/${coin.id}`}>
                        <img
                          className=":w-20 h-20 align-middle my-5 mx-10"
                          src={coin.image}
                          alt={coin.name}
                        />
                      </Link>
                      <div className="hidden md:flex flex-col">
                        <Link to={`details/${coin.id}`}>
                          <span className="font-serif font-bold text-lg">
                            {coin?.name}
                          </span>
                        </Link>
                        <span className="flex flex-col font-light text-xs uppercase">
                          {coin?.symbol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-lg">${RoundNum(coin.current_price)}</td>
                  <td
                    className={`text-sm
                        ${
                          coin.price_change_percentage_24h > 0
                            ? "text-green-500 font-semibold"
                            : "text-red-700"
                        }
                      `}
                  >
                    {PlusOrMinus(RoundNum(coin.price_change_percentage_24h))}
                  </td>
                  <td className="hidden md:table-cell">
                    ${BillionToReadable(coin.market_cap)}B
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ExtraTest;
