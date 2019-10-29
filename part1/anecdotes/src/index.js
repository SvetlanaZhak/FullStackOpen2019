import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({title}) => (<h1>{title}</h1>)
const Button =(props) => (
    <button onClick={props.onClick}>{props.text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length));
  const initialPoints = props.anecdotes.map(() => 0);
  const [points, setPoints] = useState(initialPoints)
  const maxPoints = (Math.max(...points));
  const indexOfBestAnecdote = points.indexOf(maxPoints);
  const bestAnecdote = props.anecdotes[indexOfBestAnecdote];
  
  

  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }
  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
        <Header title="Anecdote of the day" />
        {props.anecdotes[selected]}
        <div>has  &nbsp;{points[selected]}  &nbsp;votes</div>
        <br/>
        <Button onClick={voteAnecdote} text="vote"/>  
        &nbsp;
     <Button onClick={nextAnecdote} text="next anecdote"/>
     <Header title="Anecdote with most votes" />
     {maxPoints ? bestAnecdote : undefined}

    </div>
  )
 
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)