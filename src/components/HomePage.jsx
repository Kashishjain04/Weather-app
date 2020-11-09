import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [darkTheme] = useContext(ThemeContext);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const result = await response.json();
        console.log(result);
        setCountries(result);
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const searchQuery = () => {
      if (query === "") {
        setFilteredResults([]);
        return;
      }

      const results = countries.map((country) => country.name);
      console.log(results);
      const filteredtResults = results.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
      console.log(filteredtResults);
      setFilteredResults(filteredtResults.slice(1, 6));
    };
    searchQuery();
  }, [countries, query]);
  return (
    <React.Fragment>
      <div
        className={
          darkTheme ? "container-fluid bg-dark" : "container-fluid bg-light"
        }
        style={{ height: "100vh" }}
      >
        <div
          className="container"
          style={{ paddingTop: "15vh", height: "100vh", overflowY: "scroll" }}
        >
          <form className="input-group">
            <input
              type="text"
              className={
                darkTheme
                  ? "form-control rounded-0 pl-0 text-light"
                  : "form-control rounded-0 pl-0"
              }
              placeholder="search any country"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="btn btn-info ml-3">
              Search
            </button>
          </form>
          <div className="list-group shadow-lg">
            {filteredResults.map((result) => (
              <a
                href="/"
                key={result}
                className={
                  darkTheme
                    ? "list-group-item list-group-item-action text-light bg-dark"
                    : "list-group-item list-group-item-action"
                }
              >
                {result}
              </a>
            ))}
          </div>
          <div className="card-columns mt-5">
            {countries.map((country) => (
              <a
                className={
                  darkTheme
                    ? "card shadow bg-dark rounded-lg p-0"
                    : "card shadow-sm bg-light rounded-lg p-0"
                }
                key={country.alpha2Code}
                style={{
                  background: `url(${country.flag})`,
                  height: "150px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                href={country.name.trim()}
              >
                <div
                  className="w-100 rounded-lg d-flex align-items-center pointer justify-content-center text-center"
                  style={{
                    backgroundColor: darkTheme
                      ? "#00000060"
                      : "rgb(255,255,255,0.7)",
                    height: "150px",
                  }}
                >
                  <h2 className={darkTheme ? "text-light font" : "text-dark"}>
                    {country.name}
                  </h2>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;