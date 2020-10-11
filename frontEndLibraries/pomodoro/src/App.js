import React from 'react';
import Timer from './components/Timer';
import Stage from './components/Stage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div id="square-rotate" />
      <Timer />
      <Stage type="session" />
      <Stage type="break" />
    </div>
  );
}

export default App;
