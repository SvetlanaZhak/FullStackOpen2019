import React from "react";
import Person from "./Person";

const Persons = ({ persons, setPersons }) => {
  return persons.map((person, index) => (
    <Person key={index} person={person} setPersons={setPersons} />
  ));
};
export default Persons;
