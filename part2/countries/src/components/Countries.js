import React from "react";
import Button from "./Button";

const Countries = ({ countries, onCountryShow }) => (
  <div>
    {countries.map(country => (
      <div key={country.name}>
        <p>
          {country.name} <Button onClick={onCountryShow} text="show" country={country} />
        </p>
      </div>
    ))}
  </div>
);

export default Countries;
