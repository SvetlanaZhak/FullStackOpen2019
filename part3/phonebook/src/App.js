import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/Persons";
import Notification from "./components/Notification.js";
import Footer from "./components/Footer";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
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

  const onPersonSuccess = (persons, message) => {
    setPersons(persons);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const onError = errorString => {
    setErrorMessage(errorString);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <Filter
        persons={persons}
        filterName={filterName}
        onFilterChange={onFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        onPersonSuccess={onPersonSuccess}
        onError={onError}
        persons={persons}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons} />
      <Footer />
    </div>
  );
};
export default App;
