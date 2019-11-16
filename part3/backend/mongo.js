const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0-fe0qp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]

});
if (person.name === undefined && password !== undefined) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close()
            .catch(err => {
                console.log('could not get entries', err)
            })
    })
} else {
    person.save().then(response => {
        console.log(`Added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close();
    })
        .catch(err => {
            console.log('could not add entry', err)
        })
}