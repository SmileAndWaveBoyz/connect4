import React, { useState, useEffect} from 'react'
import {Route, Routes, useLocation } from 'react-router-dom';

function Player() {
  //Table logic
  const[column0, setcolumn0] = useState([0, 0, 0, 0, 0, 0]);
  const[column1, setcolumn1] = useState([0, 0, 0, 0, 0, 0]);
  const[column2, setcolumn2] = useState([0, 0, 0, 0, 0, 0]);
  const[column3, setcolumn3] = useState([0, 0, 0, 0, 0, 0]);
  const[column4, setcolumn4] = useState([0, 0, 0, 0, 0, 0]);
  const[column5, setcolumn5] = useState([0, 0, 0, 0, 0, 0]);
  const[column6, setcolumn6] = useState([0, 0, 0, 0, 0, 0]);
  const[wholeTable, setWholeTable] = useState([column0, column1, column2, column3, column4, column5, column6]);
  const[winner, setWinner] = useState(null);
  const[playerOneScore, setPlayerOneScore] = useState(0);
  const[playerTwoScore, setPlayerTwoScore] = useState(0);
  const[columnFloor, setColumnFloor] = useState(0);
  const[fallingTokenOpacity, setFallingTokenOpacity] = useState(["0","0","0","0","0","0", "0"]);
  const[fallTime, setFallTime] = useState("0.35");

  //Set who's turn it is and the timer
  const[whosTurnIsIt, setWhosTurnItIs] = useState("red");
  const[turnCounter, setTurnCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTurnCounter(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //Adding tokens depending on who's turn it is
  function addToken(column) {
    let fallTimeinMSeconds = fallTime * 1000;
    const myTimeout = setTimeout(() => {

      const newWholeTable = [...wholeTable];
      const updateColumn = [...newWholeTable[column]];
  
      for (let i = 5; i >= 0; i--) {
        if (updateColumn[i] == 0) {
          if(whosTurnIsIt == "red"){
            updateColumn[i] = 1;
          } else{
            updateColumn[i] = 2;
          }
          i = 0;
        }
      }
      newWholeTable[column] = updateColumn;
      setWholeTable(newWholeTable);
  
      //Win when there are 4 in the same column
      for (let columnNumber = 0; columnNumber < newWholeTable.length; columnNumber++) {
  
        for (let i = 0; i < newWholeTable[0].length; i++) {
          if (newWholeTable[columnNumber][i] === 1) {
            if (newWholeTable[columnNumber][i + 1] === 1) {
              if (newWholeTable[columnNumber][i + 2] === 1) {
                if (newWholeTable[columnNumber][i + 3] === 1) {
                  setWinner(1);
                  setPlayerOneScore(playerOneScore + 1)
                }
              }
            }
          } else if (newWholeTable[columnNumber][i] === 2) {
            if (newWholeTable[columnNumber][i + 1] === 2) {
              if (newWholeTable[columnNumber][i + 2] === 2) {
                if (newWholeTable[columnNumber][i + 3] === 2) {
                  setWinner(2);
                  setPlayerTwoScore(playerTwoScore + 1);
                }
              }
            }
          }
        }
  
      }
  
      //Win when there are 4 in the same row
      let rows = [];
      for (let rowNumber = 5; rowNumber >= 0; rowNumber--) {
        rows[rowNumber] = [newWholeTable[0][rowNumber], newWholeTable[1][rowNumber], newWholeTable[2][rowNumber], newWholeTable[3][rowNumber], newWholeTable[4][rowNumber], newWholeTable[5][rowNumber], newWholeTable[6][rowNumber]];
  
        for (let i = 0; i <= 6; i++) {
  
          if (rows[rowNumber][i] === 1) {
            if (rows[rowNumber][i + 1] === 1) {
              if (rows[rowNumber][i + 2] === 1) {
                if (rows[rowNumber][i + 3] === 1) {
                  setWinner(1);
                  setPlayerOneScore(playerOneScore + 1)
                }
              }
            }
          } else if (rows[rowNumber][i] === 2) {
            if (rows[rowNumber][i + 1] === 2) {
              if (rows[rowNumber][i + 2] === 2) {
                if (rows[rowNumber][i + 3] === 2) {
                  setWinner(2);
                  setPlayerTwoScore(playerTwoScore + 1)
                }
              }
            }
          } 
        }
      }
  
      //Win when there are 4 in the same diagonal
      const diagonals = [];
      diagonals[0] = [newWholeTable[0][3], newWholeTable[1][2], newWholeTable[2][1], newWholeTable[3][0]];
      diagonals[1] = [newWholeTable[0][4], newWholeTable[1][3], newWholeTable[2][2], newWholeTable[3][1], newWholeTable[4][0]];
      diagonals[2] = [newWholeTable[0][5], newWholeTable[1][4], newWholeTable[2][3], newWholeTable[3][2], newWholeTable[4][1], newWholeTable[5][0]];
      diagonals[3] = [newWholeTable[1][5], newWholeTable[2][4], newWholeTable[3][3], newWholeTable[4][2], newWholeTable[5][1], newWholeTable[6][0]];
      diagonals[4] = [newWholeTable[2][5], newWholeTable[3][4], newWholeTable[4][3], newWholeTable[5][2], newWholeTable[6][1]];
      diagonals[5] = [newWholeTable[3][5], newWholeTable[4][4], newWholeTable[5][3], newWholeTable[6][2]];
  
      diagonals[6] = [newWholeTable[6][3], newWholeTable[5][2], newWholeTable[4][1], newWholeTable[3][0]];
      diagonals[7] = [newWholeTable[6][4], newWholeTable[5][3], newWholeTable[4][2], newWholeTable[3][1], newWholeTable[2][0]];
      diagonals[8] = [newWholeTable[6][5], newWholeTable[5][4], newWholeTable[4][3], newWholeTable[3][2], newWholeTable[2][1], newWholeTable[1][0]];
      diagonals[9] = [newWholeTable[5][5], newWholeTable[4][4], newWholeTable[3][3], newWholeTable[2][2], newWholeTable[1][1], newWholeTable[0][0]];
      diagonals[10] = [newWholeTable[4][5], newWholeTable[3][4], newWholeTable[2][3], newWholeTable[1][2], newWholeTable[0][1]];
      diagonals[11] = [newWholeTable[3][5], newWholeTable[2][4], newWholeTable[1][3], newWholeTable[0][2]];
  
      for (let diagonalLine = 0; diagonalLine <= 11; diagonalLine++) {
        for (let i = 0; i < diagonals[0].length; i++) {
          if (diagonals[diagonalLine][i] === 1) {
            if (diagonals[diagonalLine][i + 1] === 1) {
              if (diagonals[diagonalLine][i + 2] === 1) {
                if (diagonals[diagonalLine][i + 3] === 1) {
                  setWinner(1);
                  setPlayerOneScore(playerOneScore + 1)
                }
              }
            }
          } else if (diagonals[diagonalLine][i] === 2) {
            if (diagonals[diagonalLine][i + 1] === 2) {
              if (diagonals[diagonalLine][i + 2] === 2) {
                if (diagonals[diagonalLine][i + 3] === 2) {
                  setWinner(2);
                  setPlayerTwoScore(playerTwoScore + 1)
                }
              }
            }
          }
        }
      }
  
  
      if (whosTurnIsIt === "red") {
        setWhosTurnItIs("yellow"); 
      } else{
        setWhosTurnItIs("red"); 
      }
      setTurnCounter(0);
      
    },fallTimeinMSeconds);


  }

  //Moving the marker
  const[markerX, setMarkerX] = useState("11%");
  function moveMarker(amount) {
    setMarkerX(amount);
  }

  function restartGame() {
    setWholeTable([column0, column1, column2, column3, column4, column5, column6]);
    setWinner(null);
    setTurnCounter(0);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  }

  function playAgain() {
    setWholeTable([column0, column1, column2, column3, column4, column5, column6]);
    setWinner(null);
    setTurnCounter(0);
  }

  //Token animation
  function tokenAnimation(column) {
    const newFallingTokenOpacity = [...fallingTokenOpacity];
    newFallingTokenOpacity[column] = 1;
    setFallingTokenOpacity(newFallingTokenOpacity);


    if (wholeTable[column][5] === 0) {
      setFallTime("0.35");
      setColumnFloor("94%");
    } else if (wholeTable[column][4] === 0){
      setFallTime("0.30");
      setColumnFloor("78%");
    } else if (wholeTable[column][3] === 0){
      setFallTime("0.25");
      setColumnFloor("62.5%");
    } else if (wholeTable[column][2] === 0){
      setFallTime("0.20");
      setColumnFloor("46%");
    } else if (wholeTable[column][1] === 0){
      setFallTime("0.15");
      setColumnFloor("30%");
    } else if (wholeTable[column][0] === 0){
      setFallTime("0.15");
      setColumnFloor("14%");
    }

    const fallTimeinMSeconds = fallTime * 1000;
    setTimeout(() => {newFallingTokenOpacity[column] = 0; setFallingTokenOpacity(newFallingTokenOpacity); setColumnFloor("0%");},fallTimeinMSeconds);
  }

  return (
    <div className="playArea">
      <div className="playButtonsContainer">
          <button className='gameButton'>MENUE</button>
          <img className="playScreenLogo" src="./assets/images/logo.svg" alt="logo"/>
          <button className='gameButton' onClick={restartGame}>RESTART</button>
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
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="Red piece" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
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
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="Red piece" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt=" Yellow piece" />
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
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="Red piece" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
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
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="Red piece" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
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
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="Red piece" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
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
                    <img className="token red" src="/assets/images/counter-red-small.svg" alt="Red piece" />
                    : <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    }</td>
                );
              })
            }
          </tr>
        </table>
        <div className="markerImageContainer">
          <img className={"markerImage " + whosTurnIsIt} src="/assets/images/marker-red.svg" alt="marker" style= {{left: markerX}}/>
        </div>
        <table className='invisibleEventListener'>
            <tr>
              <td onClick={() => {
                addToken(0);
                tokenAnimation(0);
              }
                } onMouseEnter={() => moveMarker("4.3%")}>
              </td>
              <td onClick={() => {
                addToken(1);
                tokenAnimation(1);
              }
                } onMouseEnter={() => moveMarker("18.5%")}>
              </td>
              <td onClick={() => {
                addToken(2);
                tokenAnimation(2);
              }
                } onMouseEnter={() => moveMarker("32.62%")}>
              </td>
              <td onClick={() => {
                addToken(3);
                tokenAnimation(3);
              }
                } onMouseEnter={() => moveMarker("47%")}>
              </td>
              <td onClick={() => {
                addToken(4);
                tokenAnimation(4);
              }
                } onMouseEnter={() => moveMarker("61%")}>
              </td>
              <td onClick={() => {
                addToken(5);
                tokenAnimation(5);
              }
                } onMouseEnter={() => moveMarker("75.4%")}>
              </td>
              <td onClick={() => {
                addToken(6);
                tokenAnimation(6);
              }
                } onMouseEnter={() => moveMarker("89.55%")}>
              </td>
            </tr>
        </table>

        <table className='invisibleEventListener fallingTokenTable'>
            <tr>
              <td>
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[0]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[0]}}/>
              }
              </td>
              <td>
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[1]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[1]}}/>
              }
              </td>
              <td>
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[2]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[2]}}/>
              }
              </td>
              <td>
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[3]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[3]}}/>
              }
              </td>
              <td>
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[4]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[4]}}/>
              }
              </td>
              <td >
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[5]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[5]}}/>
              }
              </td>
              <td >
              {
                    whosTurnIsIt === "red" ?
                    <img className="token red falling" src="/assets/images/counter-red-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[6]}}/>
                    :
                    <img className="token yellow falling" src="/assets/images/counter-yellow-small.svg" style={{transition: "top "+ fallTime + "s", top: columnFloor, opacity: fallingTokenOpacity[6]}}/>
              }
              </td>
            </tr>
        </table>
        <img className="frontImageLayer" src="/assets/images/board-layer-white-small.svg" alt="Front of connect 4 board"/>
        
        {
        winner === null ? 
        <div className={"playerTurnBox " + whosTurnIsIt}>
            <h3>PLAYER {whosTurnIsIt === "red"? "1" : "2"}'S TURN</h3>
            <p>{turnCounter}s</p>
        </div>
        :
        winner === 1 ?
        <div className={"playerTurnBox winner"}>
          <h3>PLAYER 1</h3>
          <p>WINS</p>
          <button className='playAgainButton'>PLAY AGAIN</button>
        </div>
        :
        <div className={"playerTurnBox winner"}>
          <h3>PLAYER 2</h3>
          <p>WINS</p>
          <button className='playAgainButton' onClick={playAgain}>PLAY AGAIN</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Player