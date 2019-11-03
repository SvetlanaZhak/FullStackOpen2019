import React, { useState } from "react";
import personsService from "../services/Persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const onNameChange = event => {
    setNewName(event.target.value);
  };

  const onNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const addPerson = event => {
    event.preventDefault();
    if (checkExistingPer(newName) === false) {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      personsService.create(personObject);
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const checkExistingPer = newName => {
    let ExistingPer = false;
    persons.forEach(person =>
      person.name === newName ? (ExistingPer = true) : (ExistingPer = false)
    );
    return ExistingPer;
  };
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default PersonForm;
