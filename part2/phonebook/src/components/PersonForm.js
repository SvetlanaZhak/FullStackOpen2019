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

  /// addPerson
  const addPerson = async event => {
    event.preventDefault();
    if (checkExistingPer(newName) === false) {
      const personObject = await personsService.create({
        name: newName,
        number: newNumber
      });

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const checkExistingPer = newName => {
    return !!persons.find(person => person.name === newName);
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
