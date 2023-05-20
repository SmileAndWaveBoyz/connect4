import React, {useState, useEffect} from 'react'
import {Route, Routes, useLocation } from 'react-router-dom';
import "./normalise.css";
import './App.css';

import Home from './components/Home';



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
        <Route path='/2player'/>
        <Route path='/rules'/>
      </Routes>

    </>
  );
}

export default App;
