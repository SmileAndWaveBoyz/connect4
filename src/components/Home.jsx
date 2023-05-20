import React from 'react'
import {NavLink} from 'react-router-dom';

function Home() {
  return (
    <div className="buttonsContainer">
        <img src="./assets/images/logo.svg" alt="logo" className='logoImage'/>
        <NavLink className='mainMenuButtons playerVsPlayer' to="/2player">PLAY VS PLAYER <img src="./assets/images/player-vs-player.svg" alt="" /></NavLink>
        <NavLink className='mainMenuButtons' to="/rules">GAME RULES</NavLink>
    </div>
  )
}

export default Home