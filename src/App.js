import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { CacheContext } from "./context/cache-context";
import { useCache } from "./hooks/cahce.hook";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import FilmList from "./components/FilmList";
import Film from "./components/Film";
import People from "./components/People";
import Character from "./components/Character";
import Planets from "./components/Planets";
import Planet from "./components/Planet";
import Species from "./components/Species";
import Specie from "./components/Specie";
import StarShips from "./components/StarShips";
import StarShip from "./components/StarShip";
import Vehicles from "./components/Vehicles";
import Vehicle from "./components/Vehicle";

import "./App.css";

function App() {
  const { getData } = useCache();

  return (
    <div className="app-main">
      <CacheContext.Provider value={{ getData }}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/films" exact>
              <FilmList />
            </Route>
            <Route path="/films/:filmId" exact>
              <Film />
            </Route>
            <Route path="/people" exact>
              <People />
            </Route>
            <Route path="/people/:peopleId" exact>
              <Character />
            </Route>
            <Route path="/planets" exact>
              <Planets />
            </Route>
            <Route path="/planets/:planetId" exact>
              <Planet />
            </Route>
            <Route path="/species" exact>
              <Species />
            </Route>
            <Route path="/species/:specieId" exact>
              <Specie />
            </Route>
            <Route path="/starships" exact>
              <StarShips />
            </Route>
            <Route path="/starships/:starShipId" exact>
              <StarShip />
            </Route>
            <Route path="/vehicles" exact>
              <Vehicles />
            </Route>
            <Route path="/vehicles/:vehicleId" exact>
              <Vehicle />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </CacheContext.Provider>
    </div>
  );
}

export default App;
