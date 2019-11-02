import React from "react";

const Country = ({ country, onlyName }) => {
  if (onlyName === true) {
    return (
      <div>
        <h1>{country.name}</h1>
      </div>
    );
  }
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
    </div>
  );
};

export default Country;
