import React from 'react';
import {Link} from 'react-router-dom';

import './FilmCard.css';

export default function FilmCard({movie}) {
  return (
    <div className="film-main">
      <Link to={`/films/${btoa(movie.url)}`}><h2 className="film-title">{movie.title} E.{movie.episode_id}</h2></Link>
      <hr/>
      <div className="film-detail-div"><p>{movie.opening_crawl.split('\n\r').splice(0, 1)[0]}</p></div>
      <hr/>
      <p className="film-date">Release Date: {movie.release_date}</p>
    </div>
  );
}