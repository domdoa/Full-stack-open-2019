import React from "react";

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

const Header = props => <h1>{props.course.name}</h1>;

const Content = ({ parts }) => {
  const generateParts = () =>
    parts.map(part => <Part key={part.id} part={part} />);
  return <>{generateParts()}</>;
};

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts
    .map(part => parseFloat(part.exercises))
    .reduce((a, b) => a + b, 0);
  return <p>total of {total} exercises</p>;
};

export default Course;
