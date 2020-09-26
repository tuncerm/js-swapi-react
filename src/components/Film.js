import React from 'react';
import './Film.css';

function Film({movie}) {
  const {title, opening_crawl, release_date} = movie;
  const parts = opening_crawl.split('\r\n');

  return (
    <div className="film-main">
      <h2 className="film-title">{title}</h2>
      <hr/>
      <div className="film-detail-div">{opening_crawl}</div>
      <hr/>
      <p className="film-date">Release Date: {release_date}</p>
    </div>
  );
}

export default Film;