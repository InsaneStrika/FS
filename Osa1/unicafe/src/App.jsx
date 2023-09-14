import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if((good+bad+neutral)<1) {
  return (
    <div>
      <p>No feedback given.</p>
    </div>
  )    
  }
  const average = (good*1+bad*(-1))/(good+bad+neutral)
  const positive = (good/(good+bad+neutral))*100 + " %"
  return (
  <div>
  <table>
    <tbody>
  <StatisticLine text="Good" value={good}/>
  <StatisticLine text="Neutral" value={neutral}/>
  <StatisticLine text="Bad" value={bad}/>
  <StatisticLine text="All" value={good+bad+neutral}/>
  <StatisticLine text="Average" value={average}/>
  <StatisticLine text="Positive" value={positive}/>
    </tbody>
  </table>
  </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    }

  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback!</h2>
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App