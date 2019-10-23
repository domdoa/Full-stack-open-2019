import React from "react";
import Button from "./Button";

const PersonDetails = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}{" "}
    <Button onClick={() => deletePerson(person.id)} text="delete" />
  </p>
);
export default PersonDetails;
