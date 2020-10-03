import React from 'react';
import {Link} from 'react-router-dom';

import './PlanetCard.css';

export default function PlanetCard({planet}) {
  return (
    <div className="planetcard-main">
      <Link to={`/planets/${btoa(planet.url)}`} className="planetcard-title-link"><h2 className="planetcard-title">{planet.name}</h2></Link>
      <hr/>
      <div className="filmcard-detail-div">
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Population: {planet.population}</p>
      </div>
    </div>
  );
}