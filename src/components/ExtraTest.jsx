import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import fetchTopCryptos from "../fetchData/fetchTopCryptos";

const ExtraTest = () => {
  const topCryptos = useQuery(["topCryptos"], fetchTopCryptos);
  let [searchValue, setSearchValue] = useState("");
  console.log(topCryptos?.data, "data");

  function RoundNum(num) {
    return Math.round(num * 1000) / 1000;
  }

  function BillionToReadable(num) {
    return RoundNum(num / 1000000000);
  }

  function PlusOrMinus(num) {
    return num > 0 ? "+" + num : num;
  }

  let filteredData = topCryptos?.data?.filter((search) => {
    return (
      search.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
      search.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <div>
      <section className="m-0 p-0 lg:m-8 p-10">
        <div>
          <h1 className="text-center text-2xl font-mono font-extrabold">
            Cryptocurrency Price List
          </h1>
          <h2 className="text-center text-lg font-mono font-bold">
            {" "}
            Top 20 coins by market cap
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="flex relative justify-center">
              <input
                type="search"
                id="default-search"
                class="flex justify-center w-80 p-4 pl-10 text-sm text-gray-900 border rounded-lg bg-gray-50"
                placeholder="Search all cryptocurrencies"
                required
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                data-testid="defaultFilter"
              />
            </div>
          </form>
        </div>
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
            {filteredData?.slice(0, 20).map((coin, index) => {
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
                    className={`text-md
                        ${
                          coin.price_change_percentage_24h > 0
                            ? "text-green-500 font-bold"
                            : "text-red-700 font-semibold"
                        } 
                      `}
                  >
                    {PlusOrMinus(RoundNum(coin.price_change_percentage_24h))}%
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
