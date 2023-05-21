import React, { useState, useEffect} from 'react'
import {Route, Routes, useLocation } from 'react-router-dom';

function Player() {
  //Table logic
  const[column0, setcolumn0] = useState([0, 0, 0, 1, 2, 1]);
  const[column1, setcolumn1] = useState([0, 0, 0, 0, 0, 1]);
  const[column2, setcolumn2] = useState([0, 0, 0, 0, 0, 0]);
  const[column3, setcolumn3] = useState([0, 0, 0, 0, 0, 0]);
  const[column4, setcolumn4] = useState([0, 0, 0, 0, 0, 0]);
  const[column5, setcolumn5] = useState([0, 0, 0, 0, 0, 0]);
  const[column6, setcolumn6] = useState([0, 0, 0, 0, 0, 0]);
  const[wholeTable, setWholeTable] = useState([column0, column1, column2, column3, column4, column5, column6]);

  //Set who's turn it is and the timer
  const[whosTurnIsIt, setWhosTurnItIs] = useState("red");
  const[turnCounter, setTurnCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTurnCounter(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function addToken(column) {
    setWholeTable([column0, column1, column2, column3, column4, column5, column6]);
    console.log(wholeTable);
    if (whosTurnIsIt === "red") {
      setWhosTurnItIs("yellow"); 
    } else{
      setWhosTurnItIs("red"); 
    }
    setTurnCounter(0);
  }

  //Moving the marker
  const[markerX, setMarkerX] = useState("11%");
  function moveMarker(amount) {
    setMarkerX(amount);
  }

  //Scoring
  const[playerOneScore, setPlayerOneScore] = useState(0);
  const[playerTwoScore, setPlayerTwoScore] = useState(0);

  return (
    <div className="playArea">
      <div className="playButtonsContainer">
          <button className='gameButton'>MENUE</button>
          <img className="playScreenLogo" src="./assets/images/logo.svg" alt="logo"/>
          <button className='gameButton'>RESTART</button>
      </div>
      <div className="playersBox">
        <div className="playersTextBubble">
          <h2>PLAYER 1</h2>
          <p>{playerOneScore}</p>
          <img className='playerOneImage' src="./assets/images/player-one.svg" alt="Player 1 smiley face" />
        </div>
        <div className="playersTextBubble">
          <h2>PLAYER 2</h2>
          <p>{playerTwoScore}</p>
          <img className='playerTwoImage' src="./assets/images/player-two.svg" alt="Player 2 smiley face" />
        </div>
      </div>

      <div className="gameBoard">
        <img className='backImageLayer' src="/assets/images/board-layer-black-small.svg" alt="back of connect 4 board" />
        <table className='gameTable'>
          <tr>
            {
              wholeTable.map((tableColumn, index) => {
                return(
                    <td>{
                    wholeTable[index][0] === 0 ? 
                    null 
                    : wholeTable[index][0] === 1 ? 
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="" />
                    }</td>
                );
              })
            }
          </tr>
          <tr>
          {
              wholeTable.map((tableColumn, index) => {
                return(
                    <td>{
                    wholeTable[index][1] === 0 ? 
                    null 
                    : wholeTable[index][1] === 1 ? 
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="" />
                    }</td>
                );
              })
            }
          </tr>
          <tr>
          {
              wholeTable.map((tableColumn, index) => {
                return(
                    <td>{
                    wholeTable[index][2] === 0 ? 
                    null 
                    : wholeTable[index][2] === 1 ? 
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="" />
                    }</td>
                );
              })
            }
          </tr>
          <tr>
          {
              wholeTable.map((tableColumn, index) => {
                return(
                    <td>{
                    wholeTable[index][3] === 0 ? 
                    null 
                    : wholeTable[index][3] === 1 ? 
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="" />
                    }</td>
                );
              })
            }
          </tr>
          <tr>
          {
              wholeTable.map((tableColumn, index) => {
                return(
                    <td>{
                    wholeTable[index][4] === 0 ? 
                    null 
                    : wholeTable[index][4] === 1 ? 
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="" />
                    }</td>
                );
              })
            }
          </tr>
          <tr>
          {
              wholeTable.map((tableColumn, index) => {
                return(
                    <td>{
                    wholeTable[index][5] === 0 ? 
                    null 
                    : wholeTable[index][5] === 1 ? 
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="" />
                    }</td>
                );
              })
            }
          </tr>
        </table>
        <img className="frontImageLayer" src="/assets/images/board-layer-white-small.svg" alt="Front of connect 4 board"/>
        
        <div className={"playerTurnBox " + whosTurnIsIt}>
            <h3>PLAYER {whosTurnIsIt === "red"? "1" : "2"}'S TURN</h3>
            <p>{turnCounter}s</p>
        </div>
        <table className='invisibleEventListener'>
            <tr>
            <img className={"markerImage " + whosTurnIsIt} src="/assets/images/marker-red.svg" alt="marker" style= {{left: markerX}}/>
              <td onClick={() => addToken(0)} onMouseEnter={() => moveMarker("11%")}></td>
              <td onClick={() => addToken(1)} onMouseEnter={() => moveMarker("24.5%")}></td>
              <td onClick={() => addToken(2)} onMouseEnter={() => moveMarker("37.55%")}></td>
              <td onClick={() => addToken(3)} onMouseEnter={() => moveMarker("50.5%")}></td>
              <td onClick={() => addToken(4)} onMouseEnter={() => moveMarker("63.7%")}></td>
              <td onClick={() => addToken(5)} onMouseEnter={() => moveMarker("77%")}></td>
              <td onClick={() => addToken(6)} onMouseEnter={() => moveMarker("90%")}></td>
            </tr>
        </table>
      </div>
    </div>
  )
}

export default Player