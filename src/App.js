import './App.css';
import {BrowserRouter as Router, Routes, Route}
  from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Stonks from './pages/stonks';
import React from "react";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route path ='/Stock' element={<Stonks/>} />
      </Routes>
    </Router>
  );
}

export default App;
