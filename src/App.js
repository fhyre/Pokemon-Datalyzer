import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/Home.js';
import TeamSelection from './pages/TeamSelection';
import ShowData from './pages/ShowData';


function App() {
  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/team-selection' element={<TeamSelection/>} />
        <Route path='/analyzer' element={<ShowData/>} />
      </Routes>
    </Router>
  );
}

export default App;
