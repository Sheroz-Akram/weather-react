import { useEffect, useState } from "react";
import logo from "./logo.png";

function Home() {
  // Application State For Search Query
  let [searchQuery, setSearchQuery] = useState("");
  let [searchDropDown, setSearchDropDown] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchQuery
      )}&format=json&limit=3`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // Create List and return it
        let locationData = data.map((value, index) => {
          return {
            latitude: value.lat,
            longitude: value.lon,
            address: value.display_name,
          };
        });
        setSearchDropDown(locationData);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
      }
    };
    if (searchQuery !== "") {
      fetchLocations();
    }
  }, [searchQuery]);

  // Store Search Query
  let handleSearchBar = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto min-h-[100vh] flex flex-col justify-center items-center">
        <img className="h-40 mb-10" alt="Website Logo" src={logo} />
        <input
          type="text"
          id="search-navbar"
          className="block w-3/4 sm:w-1/2 mb-2 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          onChange={handleSearchBar}
          value={searchQuery}
        />
        {searchDropDown.length === 0 ? null : (
          <div
            id="dropdown"
            className="bg-white divide-y divide-gray-100 rounded-lg w-3/4 sm:w-1/2 shadow dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {/* Display Search Query Result */}
              {searchDropDown.map((value, index) => {
                return (
                  <li>
                    <a
                      href={`Search/?lat=${value.latitude}&lon=${value.longitude}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
    </>
  );
}

export default Home;
