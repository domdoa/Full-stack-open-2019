import React from "react";

const Languages = ({languages}) => (
  <div>
    <h3>Languages</h3>
    {languages.map(language => <li key={language.name}>{language.name}</li>)}
  </div>
);

export default Languages;
