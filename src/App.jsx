import React, {useState, useEffect} from 'react'
import {Route, Routes, useLocation } from 'react-router-dom';
import "./normalise.css";
import './App.css';

import Home from './components/Home';
import Player from './components/Player';
import Rules from './components/Rules';

function App() {
  const [pageName, setPageName] = useState("/");
  const location = useLocation();
  useEffect(() => { 
      setPageName(location.pathname);
  }, [location]);


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/2player' element={<Player/>}/>
        <Route path='/rules'element={<Rules/>}/>
      </Routes>

    </>
  );
}

export default App;
