import React, { useCallback, useState } from 'react';

import { Drawer } from './ui-components/drawer';

import CityChoice from './components/city-choice';
import CityWeather from './components/city-weather';
import { CitiesTable } from './components/city-table';
import { ReactComponent as MenuBtnComp } from './ui-components/icons/menu.svg';
import { ReactComponent as BackBtnComp } from './ui-components/icons/back-button.svg';
import './App.css';

import 'leda/dist/styles/leda.light.css';

function App(): React.ReactElement {
  const [leftMenuVisible, setleftMenuVisible] = useState(false);
  const showLeftMenu = useCallback(() => setleftMenuVisible(true), [
    setleftMenuVisible,
  ]);
  const closeLeftMenu = useCallback(() => setleftMenuVisible(false), [
    setleftMenuVisible,
  ]);
  return (
    <div className="App">
      <MenuBtnComp className="buttonMenu" fill="#000" onClick={showLeftMenu} />
      <Drawer show={leftMenuVisible} onClose={closeLeftMenu}>
        <BackBtnComp
          className="buttonBack"
          fill="#000"
          onClick={closeLeftMenu}
        />
        <CitiesTable closeDrawer={closeLeftMenu} />
        <CityChoice />
      </Drawer>

      <CityWeather />
    </div>
  );
}

export default App;
