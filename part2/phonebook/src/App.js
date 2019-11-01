import React, { useState } from "react";
import Person from "./components/Person";
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const rows = () =>
    persons.map((person, index) => <Person key={index} person={person} />);

  const onNameChange = event => {
    setNewName(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={onNameChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>

      {rows()}
    </div>
  );
};
export default App;
