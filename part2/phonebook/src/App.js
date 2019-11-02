import React, { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [filterName, setFilter] = useState("");
  const onFilterChange = event => {
    setFilter(event.target.value);
  };
  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        filterName={filterName}
        onFilterChange={onFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm setPersons={setPersons} persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};
export default App;
