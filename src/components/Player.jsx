import React, { useState, useEffect} from 'react'
import {Route, Routes, useLocation, NavLink } from 'react-router-dom';

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
  const[display, setDisplay] = useState("none"); // This is for the pause menu
  const[tableDisplay, setTableDisplay] = useState("table");

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
                  setTableDisplay("none");
                  setPlayerOneScore(playerOneScore + 1)

                  //set the peices 
                  newWholeTable[columnNumber][i] = 3;
                  newWholeTable[columnNumber][i + 1] = 3;
                  newWholeTable[columnNumber][i + 2] = 3;
                  newWholeTable[columnNumber][i + 3] = 3;
                  setWholeTable(newWholeTable);
                }
              }
            }
          } else if (newWholeTable[columnNumber][i] === 2) {
            if (newWholeTable[columnNumber][i + 1] === 2) {
              if (newWholeTable[columnNumber][i + 2] === 2) {
                if (newWholeTable[columnNumber][i + 3] === 2) {
                  setWinner(2);
                  setTableDisplay("none");
                  setPlayerTwoScore(playerTwoScore + 1);

                  //set the peices 
                  newWholeTable[columnNumber][i] = 4;
                  newWholeTable[columnNumber][i + 1] = 4;
                  newWholeTable[columnNumber][i + 2] = 4;
                  newWholeTable[columnNumber][i + 3] = 4;
                  setWholeTable(newWholeTable);
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
                  setTableDisplay("none");
                  setPlayerOneScore(playerOneScore + 1)
                  
                  //set the peices 
                  newWholeTable[i][rowNumber] = 3;
                  newWholeTable[i + 1][rowNumber] = 3;
                  newWholeTable[i + 2][rowNumber] = 3;
                  newWholeTable[i + 3][rowNumber] = 3;
                  setWholeTable(newWholeTable);
                }
              }
            }
          } else if (rows[rowNumber][i] === 2) {
            if (rows[rowNumber][i + 1] === 2) {
              if (rows[rowNumber][i + 2] === 2) {
                if (rows[rowNumber][i + 3] === 2) {
                  setWinner(2);
                  setTableDisplay("none");
                  setPlayerTwoScore(playerTwoScore + 1)

                //set the peices 
                newWholeTable[i][rowNumber] = 4;
                newWholeTable[i + 1][rowNumber] = 4;
                newWholeTable[i + 2][rowNumber] = 4;
                newWholeTable[i + 3][rowNumber] = 4;
                setWholeTable(newWholeTable);
                }
              }
            }
          } 

        }
      }

      //Win when there are 4 in the same diagonal
      for (let columnIndex = 0; columnIndex < newWholeTable.length; columnIndex++) {
        for (let rowIndex = 0; rowIndex < newWholeTable[columnIndex].length; rowIndex++) {
          // Check diagonals starting from the current position

          // Check diagonal to the right and down
          if (
            columnIndex + 3 < newWholeTable.length &&
            rowIndex + 3 < newWholeTable[columnIndex].length &&
            newWholeTable[columnIndex][rowIndex] === 1 &&
            newWholeTable[columnIndex + 1][rowIndex + 1] === 1 &&
            newWholeTable[columnIndex + 2][rowIndex + 2] === 1 &&
            newWholeTable[columnIndex + 3][rowIndex + 3] === 1
          ) {
            setWinner(1);
            setTableDisplay("none");
            setPlayerOneScore(playerOneScore + 1)

            //set the peices 
            newWholeTable[columnIndex][rowIndex] = 3;
            newWholeTable[columnIndex + 1][rowIndex + 1] = 3;
            newWholeTable[columnIndex + 2][rowIndex + 2] = 3;
            newWholeTable[columnIndex + 3][rowIndex + 3] = 3;
            setWholeTable(newWholeTable);
          }

          // Check diagonal to the right and up
          if (
            columnIndex + 3 < newWholeTable.length &&
            rowIndex - 3 >= 0 &&
            newWholeTable[columnIndex][rowIndex] === 1 &&
            newWholeTable[columnIndex + 1][rowIndex - 1] === 1 &&
            newWholeTable[columnIndex + 2][rowIndex - 2] === 1 &&
            newWholeTable[columnIndex + 3][rowIndex - 3] === 1
          ) {
            setWinner(1);
            setTableDisplay("none");
            setPlayerOneScore(playerOneScore + 1);

            //set the peices 
            newWholeTable[columnIndex][rowIndex] = 3;
            newWholeTable[columnIndex + 1][rowIndex - 1] = 3;
            newWholeTable[columnIndex + 2][rowIndex - 2] = 3;
            newWholeTable[columnIndex + 3][rowIndex - 3] = 3;
            setWholeTable(newWholeTable);
          }
        }
      }

      for (let columnIndex = 0; columnIndex < newWholeTable.length; columnIndex++) {
        for (let rowIndex = 0; rowIndex < newWholeTable[columnIndex].length; rowIndex++) {
          // Check diagonals starting from the current position

          // Check diagonal to the right and down
          if (
            columnIndex + 3 < newWholeTable.length &&
            rowIndex + 3 < newWholeTable[columnIndex].length &&
            newWholeTable[columnIndex][rowIndex] === 2 &&
            newWholeTable[columnIndex + 1][rowIndex + 1] === 2 &&
            newWholeTable[columnIndex + 2][rowIndex + 2] === 2 &&
            newWholeTable[columnIndex + 3][rowIndex + 3] === 2
          ) {
            setWinner(2);
            setTableDisplay("none");
            setPlayerTwoScore(playerTwoScore + 1);

            //set the peices 
            newWholeTable[columnIndex][rowIndex] = 4;
            newWholeTable[columnIndex + 1][rowIndex + 1] = 4;
            newWholeTable[columnIndex + 2][rowIndex + 2] = 4;
            newWholeTable[columnIndex + 3][rowIndex + 3] = 4;
            setWholeTable(newWholeTable);
          }

          // Check diagonal to the right and up
          if (
            columnIndex + 3 < newWholeTable.length &&
            rowIndex - 3 >= 0 &&
            newWholeTable[columnIndex][rowIndex] === 2 &&
            newWholeTable[columnIndex + 1][rowIndex - 1] === 2 &&
            newWholeTable[columnIndex + 2][rowIndex - 2] === 2 &&
            newWholeTable[columnIndex + 3][rowIndex - 3] === 2
          ) {
            setWinner(2);
            setTableDisplay("none");
            setPlayerTwoScore(playerTwoScore + 1);

            //set the peices 
            newWholeTable[columnIndex][rowIndex] = 4;
            newWholeTable[columnIndex + 1][rowIndex - 1] = 4;
            newWholeTable[columnIndex + 2][rowIndex - 2] = 4;
            newWholeTable[columnIndex + 3][rowIndex - 3] = 4;
            setWholeTable(newWholeTable);
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
    setDisplay("none"); // This is just to make the pause menu go away
    setTableDisplay("table");
  }

  function playAgain() {
    setWholeTable([column0, column1, column2, column3, column4, column5, column6]);
    setWinner(null);
    setTurnCounter(0);
    setTableDisplay("table");
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
      setColumnFloor("47%");
    } else if (wholeTable[column][1] === 0){
      setFallTime("0.15");
      setColumnFloor("31.2%");
    } else if (wholeTable[column][0] === 0){
      setFallTime("0.15");
      setColumnFloor("15.2%");
    }

    const fallTimeinMSeconds = fallTime * 1000;
    setTimeout(() => {newFallingTokenOpacity[column] = 0; setFallingTokenOpacity(newFallingTokenOpacity); setColumnFloor("0%");},fallTimeinMSeconds);
  }

  return (

    <div className="playArea">

      <div className="pauseMenu" style={{display: display}}>
        <h2>PAUSE</h2>
        <button onClick={() => setDisplay("none")}>CONTINUE GAME</button>
        <button onClick={restartGame}>RESTART</button>
        <NavLink className= "pauseQuitButton" to="/">QUIT GAME</NavLink>
      </div>
      <div className="overlay" style={{display: display}}></div>

      <div className="playButtonsContainer">
          <button className='gameButton' onClick={() => setDisplay("flex")}>MENU</button>
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
                    : wholeTable[index][0] == 2 ?
                    <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    : wholeTable[index][0] === 3 ?
                    <svg className='token win'  viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FD6687" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#fd6687', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    :  <svg className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FFCE67" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#FFCE67', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
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
                    : wholeTable[index][1] == 2 ?
                    <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    : wholeTable[index][1] === 3 ?
                    <svg className='token win'  viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FD6687" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#fd6687', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    : <svg className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FFCE67" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#FFCE67', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
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
                    : wholeTable[index][2] == 2 ?
                    <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    : wholeTable[index][2] === 3 ?
                    <svg className='token win'  viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FD6687" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#fd6687', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    : <svg className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FFCE67" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#FFCE67', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
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
                    : wholeTable[index][3] == 2 ?
                    <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    : wholeTable[index][3] === 3 ?
                    <svg className='token win'  viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FD6687" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#fd6687', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    : <svg className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FFCE67" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#FFCE67', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
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
                    : wholeTable[index][4] == 2 ?
                    <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    : wholeTable[index][4] === 3 ?
                    <svg className='token win' className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FD6687" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#fd6687', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    : <svg className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FFCE67" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#FFCE67', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
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
                    : wholeTable[index][5] == 2 ?
                    <img className="token yellow" src="/assets/images/counter-yellow-small.svg" alt="Yellow piece" />
                    : wholeTable[index][5] === 3 ?
                    <svg className='token win'  viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FD6687" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#fd6687', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    : <svg className='token win' viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg"><defs><circle id="path-1" cx="35" cy="35" r="32" /><filter x="0" y="0" width="1" height="1.078125" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1" id="feOffset5" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" id="feComposite7" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" id="feColorMatrix9"/></filter></defs><g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="counter-red-large"><circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35" /><circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35" /><g id="Oval-Copy-43"><use fill="#FFCE67" fillRule="evenodd" xlinkHref="#path-1" id="use16" /><use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" id="use18" /><circle id="whiteRingLarge" style={{ fill: 'transparent', stroke: 'rgb(255, 255, 255)', strokeWidth: '12px' }} cx="35" cy="35" r="15" /><circle style={{ fill: '#FFCE67', strokeWidth: '1.33094' }} id="path437" cx="35" cy="35" r="6" /></g></g></g></svg>
                    }</td>
                );
              })
            }
          </tr>
        </table>
        <div className="markerImageContainer">
          <img className={"markerImage " + whosTurnIsIt} src="/assets/images/marker-red.svg" alt="marker" style= {{left: markerX}}/>
        </div>
        <table className='invisibleEventListener noSelect' style={{display: tableDisplay}}>
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
          <button className='playAgainButton' onClick={playAgain}>PLAY AGAIN</button>
        </div>
        :
        <div className={"playerTurnBox winner"}>
          <h3>PLAYER 2</h3>
          <p>WINS</p>
          <button className='playAgainButton' onClick={playAgain}>PLAY AGAIN</button>
        </div>
        }
      </div>
      
      {
      winner === 1 ?
      <footer style={{backgroundColor: "var(--player1)"}}></footer>
      : winner === 2 ?
      <footer style={{backgroundColor: "var(--player2)"}}></footer>
      : <footer style={{backgroundColor: "var(--primary)"}}></footer>
      }
    </div>
  )
}

export default Player