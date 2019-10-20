import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  let [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const selectAnecdote = () => () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    return setSelected(rand);
  };

  const vote = selected => () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    return setVotes(updatedVotes);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
      <Button onClick={vote(selected)} text="vote" />
      <Button onClick={selectAnecdote()} text="next anecdote" />
      <TopAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const AnecdoteOfTheDay = ({ anecdotes, votes, selected }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </>
  );
};

const TopAnecdote = ({ anecdotes, votes }) => {
  return (
    <>
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {Math.max(...votes)} votes</p>
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
