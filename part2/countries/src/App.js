import React, { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountryFilter] = useState("");

  const onFilterSeacrh = event => {
    setCountryFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country => {
    if (countrySearch === "") {
      return false;
    } else {
      return (
        country.name.toLowerCase().indexOf(countrySearch.toLowerCase()) !== -1
      );
    }
  });

  return (
    <div>
      <Filter
        countries={countries}
        countrySearch={countrySearch}
        onFilterSeacrh={onFilterSeacrh}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
};
export default App;
