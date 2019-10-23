import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/Persons";
import Notification from "./components/Notification";
import "./app.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (persons.find(person => person.name === newName)) {
      const foundPersonId = persons.find(person => person.name === newName).id;
      updatePerson(foundPersonId, newPerson);
      return;
    }

    personService.create(newPerson).then(data => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    });
    setMessage(`New person added: '${newPerson.name}'`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updatePerson = (foundPersonId, newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      personService
        .update(foundPersonId, newPerson)
        .then(data => {
          setPersons(
            persons.map(person => (person.id !== foundPersonId ? person : data))
          );
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          setMessage(`ERROR: Information of ${newPerson.name} has already been deleted from the server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      setMessage(
        `Person number updated: '${newPerson.name} ${newPerson.number}'`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deletePerson = id => {
    if (
      window.confirm(
        `Do you really want to delete ${persons.find(p => p.id === id).name} ?`
      )
    ) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterString={filterString} setFilterString={setFilterString} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      {filterString === "" ? (
        <Persons persons={persons} deletePerson={deletePerson} />
      ) : (
        <Persons
          persons={persons.filter(person =>
            person.name.toLowerCase().includes(filterString.toLowerCase())
          )}
          deletePerson={deletePerson}
        />
      )}
    </div>
  );
};

export default App;
