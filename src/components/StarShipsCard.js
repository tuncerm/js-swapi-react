import React from 'react';
import {Link} from 'react-router-dom';

import './StarShipsCard.css';

export default function StarShipsCard({starship}) {
  return (
    <div className="starshipscard-main">
      <Link to={`/starships/${btoa(starship.url)}`} className="starshipscard-title-link"><h2 className="starshipscard-title">{starship.name}</h2></Link>
      <hr/>
      <div className="starshipscard-detail-div">
        <p>Model: {starship.model}</p>
        <p>Manufacturer: {starship.manufacturer}</p>
        <p>Cost: {starship.cost_in_credits}</p>
      </div>
    </div>
  );
}