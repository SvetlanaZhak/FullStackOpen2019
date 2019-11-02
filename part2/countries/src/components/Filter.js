import React from "react";

const Filter = ({ countrySearch, onFilterSeacrh }) => {
  return (
    <div>
      find countries <input value={countrySearch} onChange={onFilterSeacrh} />
    </div>
  );
};
export default Filter;
