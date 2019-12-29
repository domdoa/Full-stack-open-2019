const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-g9mvi.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 3},
  number: {type: String, required: true, minlength: 8}
});


const Person = mongoose.model("Person", personSchema);

if (!process.argv[3]) {
  return Person.find({}).then(result => {
    console.log("Phonebook:");
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
});

person.save().then(response => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
