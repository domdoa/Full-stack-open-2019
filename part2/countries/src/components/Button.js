import React from "react";

const Button = ({ onClick, text, country }) => <button onClick={onClick} country={country.name}>{text}</button>;

export default Button;
