import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Drawer } from './ui-components/drawer';

import CityChoice from './components/city-choice';
import CityWeather from './components/city-weather';
import { CitiesTable } from './components/city-table';
import { ReactComponent as MenuBtnComp } from './ui-components/icons/menu.svg';
import { ReactComponent as BackBtnComp } from './ui-components/icons/back-button.svg';
import './App.css';
import { Statistics } from './components/statistics/statistics';
import { Chart } from './components/statistics/chart';

function App(): React.ReactElement {
  const [leftMenuVisible, setleftMenuVisible] = useState(false);
  const showLeftMenu = useCallback(() => setleftMenuVisible(true), [
    setleftMenuVisible,
  ]);
  const closeLeftMenu = useCallback(() => setleftMenuVisible(false), [
    setleftMenuVisible,
  ]);

  const [showCityChoice, setShowCityChoice] = useState<boolean>(false);
  return (
    <div className="App">
      <Router>
        <MenuBtnComp
          className="buttonMenu"
          fill="#000"
          onClick={showLeftMenu}
        />
        <Drawer show={leftMenuVisible} onClose={closeLeftMenu}>
          {!showCityChoice && (
            <>
              <BackBtnComp
                className="buttonBack"
                fill="#000"
                onClick={closeLeftMenu}
              />
              <CitiesTable closeDrawer={closeLeftMenu} />
              <button
                className="button-about"
                onClick={() => setShowCityChoice(true)}
              >
                Добавить город
              </button>

              <Link
                className="button-about"
                to="/statistics"
                onClick={closeLeftMenu}
              >
                Статистика
              </Link>
              <Link
                className="button-about"
                to="/stat-charts"
                onClick={closeLeftMenu}
              >
                Графики
              </Link>
            </>
          )}
          {showCityChoice && (
            <CityChoice onClose={() => setShowCityChoice(false)} />
          )}
        </Drawer>

        <Switch>
          <Route exact path="/">
            <CityWeather showLeftMenu={showLeftMenu} />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
          <Route exact path="/stat-charts">
            <Chart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
