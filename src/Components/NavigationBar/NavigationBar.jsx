import { useEffect, useState } from "react";
import logo from "./logo.png";
import { useReverseGeoLocation } from "../../Functions/Location";

export default function () {
  // Application State For Search Query
  let [searchQuery, setSearchQuery] = useState("");
  let [searchDropDown, setSearchDropDown] = useState([]);

  useEffect(() => {
    if (searchQuery !== "") {
      try {
        useReverseGeoLocation(searchQuery).then((result) => {
          setSearchDropDown(result);
        });
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  }, [searchQuery]);

  // Store Search Query
  let handleSearchBar = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-12" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Rush Cloud
            </span>
          </a>
          <div className="flex md:order-2">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={handleSearchBar}
                value={searchQuery}
              />
              {/* Display Result Drop Down */}
              {searchDropDown.length === 0 ? null : (
                <div
                  id="dropdown"
                  class="z-10 absolute hidden md:block mt-2 bg-white divide-y divide-gray-100 rounded-lg w-full shadow dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {/* Display Search Query Result */}
                    {searchDropDown.map((value, index) => {
                      return (
                        <li>
                          <a
                            href={`lat=${value.latitude}&lon=${value.longitude}`}
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            {value.address}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={handleSearchBar}
                value={searchQuery}
              />
              {/* Drop Down Search */}
              {searchDropDown.length === 0 ? null : (
                <div
                  id="dropdown"
                  class="z-10 absolute md:hidden mt-2 bg-white divide-y divide-gray-100 rounded-lg w-full shadow dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {/* Display Search Query Result */}
                    {searchDropDown.map((value, index) => {
                      return (
                        <li>
                          <a
                            href={`lat=${value.latitude}&lon=${value.longitude}`}
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            {value.address}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
