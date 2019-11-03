import React from "react";
import Weather from "./Weather";
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <br />
      <strong>languages</strong>
      <ul>
        {country.languages.map((language, index) => {
          return <li key={index}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt="flag" style={{ height: "100px" }} />
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
