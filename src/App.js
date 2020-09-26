import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import {CacheContext} from './context/cache-context';
import {useCache} from './hooks/cahce.hook';

import Home from './components/Home';
import NavBar from './components/NavBar';
import FilmList from './components/FilmList';
import People from './components/People';

import './App.css';

function App() {
  const {getData} = useCache();

  return (
    <div className="app-main">
      <CacheContext.Provider value={{getData}}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/films" exact><FilmList /></Route>
            <Route path="/people" exact><People /></Route>
            {/* <Route path="/planets" exact><Planet /></Route>
            <Route path="/species" exact><Species /></Route>
            <Route path="/starships" exact><Starship /></Route>
            <Route path="/vehicles" exact><Vehicle /></Route> */}
            <Redirect to="/" />
          </Switch>
        </Router>
      </CacheContext.Provider>
    </div>
  );
}

export default App;
