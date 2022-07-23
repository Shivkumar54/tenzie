import React from 'react'
import './App.css';

const Die = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }

  return (
      <div onClick={props.holdDice} className='die-faces' style={styles} >
          <h1 className='.die-num'>{props.value }</h1>
    </div>
  )
}

export default Die