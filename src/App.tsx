import React from 'react';
import CityChoice from './components/city-choice';
import CityWeather from './components/city-weather';
import { CitiesTable } from './components/city-table';
// import logo from "./logo.svg";
// import "./App.css";

import 'leda/dist/styles/leda.light.css';

function App(): React.ReactElement {
  return (
    <div className="App">
      <CityWeather />
      <CitiesTable />
      <CityChoice />
    </div>
  );
}

export default App;
