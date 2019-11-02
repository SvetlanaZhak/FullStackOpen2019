import React, { useState } from "react";
import Person from "./components/Person";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");

  const onFilterChange = event => setFilter(event.target.value);
  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  );

  const rows = () =>
    filteredPersons.map((person, index) => (
      <Person key={index} person={person} />
    ));

  const onNameChange = event => {
    setNewName(event.target.value);
  };

  const onNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const checkExistingPer = newName => {
    let ExistingPer = false;
    persons.forEach(person =>
      person.name === newName ? (ExistingPer = true) : (ExistingPer = false)
    );
    return ExistingPer;
  };

  const addPerson = event => {
    event.preventDefault();
    if (checkExistingPer(newName) === false) {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={filterName} onChange={onFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={onNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  );
};
export default App;
