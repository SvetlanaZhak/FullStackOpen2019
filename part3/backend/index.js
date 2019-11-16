require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Person = require('./models/person');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.static('build'))
app.use(bodyParser.json());
app.use(cors());

morgan.token("body", function (req) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4
//   }
// ];


app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  Person.countDocuments({}, (err, count) => {
    res.send(`
      <p>Phonebook has info for ${count} people.</p>
      <p>${date}</p>
    `);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(400).end()
      }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number || false
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
});
// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
//   return maxId + 1;
// };
// const checkName = inputName => {
//   const match = persons.find(persons => persons.name === inputName);
//   if (match) {
//     return true;
//   } else {
//     return false;
//   }
// };
// app.post("/api/persons", (request, response, next) => {
//   const body = request.body;

//   if (!body.name) {
//     return response.status(400).json({
//       error: "Name is missing"
//     });
//   }
//   else if (!body.number) {
//     return response.status(400).json({
//       error: "Number is missing"
//     });
//   } else if (checkName(body.name) === false) {
//     const person = new Person({
//       name: body.name,
//       number: body.number,
//       id: generateId()
//     });
//     persons = persons.concat(person);
//     response.json(person);
//     person.save().then(savedPerson => savedPerson.toJSON())
//       .then(savedAndFormattedPerson => {
//         response.json(savedAndFormattedPerson)
//       }).catch(error => next(error))
//   } else {
//     response.status(400).json({
//       error: "name must be unique"
//     });

//   }
// });
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: "query" })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
