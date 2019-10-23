import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const filterCountries = () =>
    countries.filter(country =>
      country.name.toLowerCase().includes(filterString.toLowerCase())
    );

  const handleCountryShow = event =>
    setFilterString(event.target.attributes.country.value);

  var content;
  if (filterCountries().length > 10) {
    content = <p>Too many mathces, specify another filter</p>;
  } else if (filterCountries().length === 1) {
    content = <Country country={filterCountries()} />;
  } else if (filterCountries().length === 0) {
    content = <p>No country found with this filter</p>;
  } else {
    content = (
      <Countries
        countries={filterCountries()}
        onCountryShow={handleCountryShow}
      />
    );
  }

  return (
    <div>
      <Filter filterString={filterString} setFilterString={setFilterString} />
      {content}
    </div>
  );
}

export default App;
