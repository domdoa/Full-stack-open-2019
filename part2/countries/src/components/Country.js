import React from "react";
import Languages from "./Languages";
import Weather from './Weather';

const Country = ({ country }) => (
  <div>
    <h1>{country[0].name}</h1>
    <p>capital {country[0].capital}</p>
    <p>population {country[0].population}</p>
    <Languages languages={country[0].languages} />
    <img src={country[0].flag} alt="flag" width="20%" height="20%"></img>
    <Weather capital={country[0].capital} />
  </div>
);

export default Country;
