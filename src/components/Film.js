import React, { useState } from 'react';
import Character from './Character';

import './Film.css';

function Film({movie}) {
  const [isExpanded, setExpanded] = useState(false);

  function expandClickHandler(){
    setExpanded(e => !e);
  }

  return (
    <div className={`film-main ${isExpanded && 'film-expanded' }`}>
      <button className="film-moreinfo-button" onClick={expandClickHandler}>{isExpanded ? 'Less Info' : 'More Info'}</button>
      <h2 className="film-title">{movie.title} E.{movie.episode_id}</h2>
      <hr/>
      <div className="film-detail-div">{movie.opening_crawl}</div>
      <hr/>
      <p className="film-date">Release Date: {movie.release_date}</p>
      {isExpanded && <div>
        <hr/>
        <h3>Characters</h3>
        <div className="film-character-list">
          {movie.characters.map(c=><Character key={btoa(c)} url={c} />)}
        </div>
      </div>}
    </div>
  );
}

export default Film;