import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';

import { CacheContext } from '../context/cache-context';

import Spinner from './Spinner';
import SpeciesCard from './SpeciesCard';
import FilmCard from './FilmCard';

import './Planet.css';

function Planet() {
  const {planetId} = useParams();
  const [isLoading, setLoading] = useState(false);
  const [planet, setPlanet] = useState({});

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        setLoading(true);
        const response = await getData(atob(planetId));
        setPlanet(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlanet();
  }, [getData, planetId]);

  console.log(planet);

  return (
    <div className="planet-main">
      { isLoading && <Spinner asOverlay /> }
      <h2 className="planet-title">{planet.name}</h2>
      { !isLoading && <div className="planet-content">
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Diameter: {planet.diameter}</p>
        <p>Climate: {planet.climate}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water: {planet.surface_water}</p>
        <p>Population: {planet.population}</p>
        <hr/>
        <h3>Residents</h3>
        <div className="planet-subarray">
          {planet && planet.residents && planet.residents.map(specie=><SpeciesCard key={btoa(specie)} url={specie}/>)}
        </div>
        <hr/>
        <h3>Films</h3>
        <div className="planet-subarray">
          {planet && planet.films && planet.films.map(film=><FilmCard key={btoa(film)} url={film}/>)}
        </div>
      </div> }
    </div>
  );
}

export default Planet;