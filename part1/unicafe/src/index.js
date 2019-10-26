import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =(props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Stats = props => {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  };
        
const Statistics =({good, neutral, bad}) =>{
    
    return (
        <table>
             <tbody>
             <Stats text="good " value={good} /> 
             <Stats text="neutral " value={neutral} /> 
             <Stats text="bad " value={bad} /> 
             
          </tbody>
        </table>
      )
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <div>
        <h1>give feedback</h1>
            
            <Button handleClick={() => setGood(good + 1)} text="good"/>
            
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
            
            <Button handleClick={() => setBad(bad + 1)} text="bad"/>
           
            <h1>statistics</h1>
            <Statistics
        good={good}
        bad={bad}
        neutral={neutral}

      />

        </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)