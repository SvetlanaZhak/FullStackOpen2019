const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  personsNum = persons.length;
  const info = `Phonebook has info for ${personsNum} people`;
  res.send(`<p>${info}</p><p>${Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  return maxId + 1;
};
const checkName = inputName => {
  const match = persons.find(persons => persons.name === inputName);
  if (match) {
    return true;
  } else {
    return false;
  }
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing"
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "Number is missing"
    });
  }
  if (checkName(body.name) === false) {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    };
    persons = persons.concat(person);
    response.json(person);
  } else {
    response.status(400).json({
      error: "name must be unique"
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
