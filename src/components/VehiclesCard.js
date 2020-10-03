import React from 'react';
import {Link} from 'react-router-dom';

import './VehiclesCard.css';

export default function VehiclesCard({vehicle}) {
  return (
    <div className="vehiclescard-main">
      <Link to={`/vehicles/${btoa(vehicle.url)}`} className="vehiclescard-title-link"><h2 className="vehiclescard-title">{vehicle.name}</h2></Link>
      <hr/>
      <div className="vehiclescard-detail-div">
        <p>Model: {vehicle.model}</p>
        <p>Manufacturer: {vehicle.manufacturer}</p>
        <p>Cost: {vehicle.cost_in_credits}</p>
      </div>
    </div>
  );
}