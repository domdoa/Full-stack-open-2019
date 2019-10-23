import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const leaveFeedback = feedback => () => {
    switch (feedback) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={leaveFeedback("good")} text="good" />
      <Button onClick={leaveFeedback("neutral")} text="neutral" />
      <Button onClick={leaveFeedback("bad")} text="bad" />
      <h1>statistics</h1>
      {good || neutral || bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Statistics = props => {
  return (
    <table>
      <Statistic text="good" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
      <Statistic text="bad" value={props.bad} />
      <Statistic text="all" value={props} />
      <Statistic text="average" value={props} />
      <Statistic text="positive" value={props} />
    </table>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value }) => {
  switch (text) {
    case "good":
    case "neutral":
    case "bad":
      return (
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      );
    case "all":
      return (
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value.good + value.neutral + value.bad}</td>
          </tr>
        </tbody>
      );
    case "average":
      return (
        <tbody>
          <tr>
            <td>{text}</td>
            <td>
              {(value.good - value.bad) /
                (value.good + value.bad + value.neutral)}
            </td>
          </tr>
        </tbody>
      );
    case "positive":
      return (
        <tbody>
          <tr>
            <td>{text}</td>
            <td>
              {(value.good / (value.good + value.bad + value.neutral)) * 100} %
            </td>
          </tr>
        </tbody>
      );
    default:
      break;
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
