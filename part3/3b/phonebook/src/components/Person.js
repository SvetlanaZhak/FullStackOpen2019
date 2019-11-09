import React from "react";
import personsService from "../services/Persons";

const Person = ({ person, setPersons }) => {
  // delete Person
  const deletePerson = event => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(() => {
          personsService.getAll().then(updatedPersons => {
            setPersons(updatedPersons);
          });
        })
        .catch(error => {
          console.log("Person does not exist");
        });
    }
  };
  return (
    <p>
      {person.name} {person.number} {""}
      <button onClick={deletePerson}>delete</button>
    </p>
  );
};

export default Person;
