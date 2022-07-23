import React, { useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"


function App() {
  
  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false)
    
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function newDice() {
    const newRandomDice = []
    for (let i = 0; i < 10; i++){
      newRandomDice.push(
        generateNewDie()
      )
    }
    return newRandomDice
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
  }))
}

  const dieElements = dice.map((eachDie) =>
    <Die key={eachDie.id}
      value={eachDie.value}
      isHeld={eachDie.isHeld}
      holdDice={() => holdDice(eachDie.id)}
    />
  )
  
  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
  } else {
      setTenzies(false)
      setDice(newDice())
  }
}


  return (
    <div className="App">
      <div className="container">
      {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same.
          Click each die to freeze it at its current value between rolls.
        </p>
        <div className='dieList'>
        {dieElements}
       </div>
       
        <button onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
     </div>
    </div>
  );
}

export default App;
