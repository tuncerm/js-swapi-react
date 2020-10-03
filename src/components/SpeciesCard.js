import React from 'react';
import {Link} from 'react-router-dom';

import './SpeciesCard.css';

export default function SpeciesCard({specie}) {
  return (
    <div className="speciescard-main">
      <Link to={`/species/${btoa(specie.url)}`} className="speciescard-title-link"><h2 className="speciescard-title">{specie.name}</h2></Link>
      <hr/>
      <div className="speciescard-detail-div">
        <p>Language: {specie.language}</p>
        <p>Designation: {specie.designation}</p>
        <p>Classification: {specie.classification}</p>
      </div>
    </div>
  );
}