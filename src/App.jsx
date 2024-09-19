import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <p>Here Some Country Detail</p>
    </div>
  );
};
const CountryLister = ({ countries }) => {
  // console.log(countries);

  if (countries.length > 10) {
    return "Too many matches, specify another filter";
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Name</th>
          <th>Capital</th>
          <th>Region</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => {
          return (
            <tr key={country.name.common}>
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>{country.population}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/";
  useEffect(() => {
    console.log("Fetching initial data");
    axios.get(`${baseURL}/api/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);
  const handleFormChange = (event) => {
    const searchedCountry = event.target.value;
    setCountry(searchedCountry);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchedCountry)
      )
    );
  };
  return (
    <section>
      <div className="layout  mt-12">
        <h1 className="text-7xl font-thin text-center">Data for Countries</h1>
        <p className="text-center">
          Find interesting data for any country in the world
        </p>
        <div className="pt-8">
          <form action="submit">
            <label htmlFor="country">Type in Country Name: </label>
            <input
              className="input input-bordered w-full max-w-xs"
              id="country"
              type="text"
              placeholder="Germany"
              value={country}
              onChange={handleFormChange}
            />
          </form>
        </div>
        <CountryLister countries={filteredCountries} />
      </div>
    </section>
  );
}

export default App;
