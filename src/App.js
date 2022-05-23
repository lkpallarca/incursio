import React from 'react';
import { Routes, Route } from 'react-router-dom'
import EventPage from './Components/EventPage';
import GamePage from './Components/GamePage';
import HomePage from './Components/HomePage';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/event' element={ <EventPage/> } />
        <Route path='/game' element={ <GamePage/> } />
      </Routes>
    </div>
  );
}
