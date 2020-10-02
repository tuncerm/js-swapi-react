import React from 'react';
import {Link} from 'react-router-dom';

import './FilmCard.css';

export default function FilmCard({movie}) {
  return (
    <div className="filmcard-main">
      <Link to={`/films/${btoa(movie.url)}`} className="filmcard-title-link"><h2 className="filmcard-title">{movie.title} E.{movie.episode_id}</h2></Link>
      <hr/>
      <div className="filmcard-detail-div"><p>{movie.opening_crawl.split('\n\r').splice(0, 1)[0]}</p></div>
      <hr/>
      <p className="filmcard-date">Release Date: {movie.release_date}</p>
    </div>
  );
}