import './App.css';

import React, {useCallback, useState} from 'react';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import CityChoice from './components/city-choice';
import {CitiesTable} from './components/city-table';
import CityWeather from './components/city-weather';
import {Chart} from './components/statistics/chart';
import {Statistics} from './components/statistics/statistics';
import {Drawer} from './ui-components/drawer';
import BackBtnComp from './ui-components/icons/back-button.component.svg';
import MenuBtnComp from './ui-components/icons/menu.component.svg';

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
