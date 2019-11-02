import React from "react";
// const [persons, setPersons] = useState([
//   { name: "Arto Hellas", number: "040-123456" },
//   { name: "Ada Lovelace", number: "39-44-5323523" },
//   { name: "Dan Abramov", number: "12-43-234345" },
//   { name: "Mary Poppendieck", number: "39-23-6423122" }
// ]);
const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export default Person;
