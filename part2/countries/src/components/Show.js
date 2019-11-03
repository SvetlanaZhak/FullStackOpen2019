import React from "react";

const Show = ({ country, setCountryFilter }) => {
  const onClick = () => {
    setCountryFilter(country.name);
  };

  return (
    <div>
      {country.name} <button onClick={onClick}>show</button>
    </div>
  );
};

export default Show;
