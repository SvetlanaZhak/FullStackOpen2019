import React from "react";
import Country from "./Country";
import Show from "./Show";

const Countries = ({ countries, setCountryFilter }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length < 10 && countries.length > 1) {
    return countries.map((country, index) => (
      <div key={index}>
        <Show country={country} setCountryFilter={setCountryFilter} />
      </div>
    ));
  } else if (countries.length === 1) {
    return countries.map((country, index) => (
      <Country key={index} country={country} />
    ));
  } else {
    return " ";
  }
};
export default Countries;
