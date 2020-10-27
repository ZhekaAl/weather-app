import React from 'react';
import CityChoice from './city-choice';
import CityWeather from './city-weather';
// import logo from "./logo.svg";
// import "./App.css";

import 'leda/dist/styles/leda.light.css';

function App() {
  return (
    <div className="App">
      <CityChoice />
      <CityWeather />
    </div>
  );
}

export default App;
