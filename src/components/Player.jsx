import React from 'react'
import {Route, Routes, useLocation } from 'react-router-dom';

function Player() {
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
          <p>12</p>
          <img className='playerOneImage' src="./assets/images/player-one.svg" alt="Player 1 smiley face" />
        </div>
        <div className="playersTextBubble">
          <h2>PLAYER 1</h2>
          <p>12</p>
          <img className='playerTwoImage' src="./assets/images/player-two.svg" alt="Player 2 smiley face" />
        </div>
      </div>

      <div className="gameBoard">
        <img className='backImageLayer' src="/assets/images/board-layer-black-small.svg" alt="back of connect 4 board" />
        <table>
          <tr>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
          </tr>
          <tr>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><img className="token red" src="/assets/images/counter-red-small.svg" alt="" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <img className="frontImageLayer" src="/assets/images/board-layer-white-small.svg" alt="Front of connect 4 board"/>
        
        <div className="playerTurnBox">
            <h3>PLAYER 1'S TURN</h3>
            <p>15s</p>
        </div>
      </div>
    </div>
  )
}

export default Player