import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  return persons.map((person, index) => <Person key={index} person={person} />);
};
export default Persons;
