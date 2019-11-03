import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilter] = useState("");
  const onFilterChange = event => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

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
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};
export default App;
