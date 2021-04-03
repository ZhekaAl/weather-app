import React, { useCallback, useState } from 'react';

import { Drawer } from './ui-components/drawer';

import CityChoice from './components/city-choice';
import CityWeather from './components/city-weather';
import { CitiesTable } from './components/city-table';
import { ReactComponent as MenuBtnComp } from './ui-components/icons/menu.svg';
import { ReactComponent as BackBtnComp } from './ui-components/icons/back-button.svg';
import './App.css';

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
      <MenuBtnComp className="buttonMenu" fill="#000" onClick={showLeftMenu} />
      <Drawer show={leftMenuVisible} onClose={closeLeftMenu}>
        {!showCityChoice && (
          <BackBtnComp
            className="buttonBack"
            fill="#000"
            onClick={closeLeftMenu}
          />
        )}
        {!showCityChoice && <CitiesTable closeDrawer={closeLeftMenu} />}
        {!showCityChoice && (
          <button
            className="button-about"
            onClick={() => setShowCityChoice(true)}
          >
            Добавить город
          </button>
        )}
        {showCityChoice && (
          <CityChoice onClose={() => setShowCityChoice(false)} />
        )}
      </Drawer>

      <CityWeather />
    </div>
  );
}

export default App;
