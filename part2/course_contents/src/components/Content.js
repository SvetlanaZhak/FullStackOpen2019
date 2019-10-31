import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const partList = () => parts.map(part => <Part key={part.id} part={part} />);
  console.log(partList());
  return (
    <div>
      {partList()}

      <Total parts={parts} />
    </div>
  );
};
export default Content;
