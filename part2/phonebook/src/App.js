import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilter] = useState("");
  const onFilterChange = event => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
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
      <Persons persons={filteredPersons} />
    </div>
  );
};
export default App;
