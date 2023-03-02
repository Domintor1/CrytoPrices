const Navbar = () => {
  return (
    <nav className="bg-black border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-center mx-auto">
        <a href="../" className="flex items-center">
          <span className=" text-2xl font-semibold text-white">
            CryptoPrice
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
