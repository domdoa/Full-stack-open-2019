import React from "react";
import PersonDetails from "./PersonDetails";

const Persons = ({ persons, deletePerson }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map(person => (
      <PersonDetails key={person.name} person={person} deletePerson={deletePerson} /> 
    ))}
  </div>
);

export default Persons;
