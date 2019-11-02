import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length < 10 && countries.length > 1) {
    return countries.map((country, index) => (
      <Country onlyName={true} key={index} country={country} />
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
